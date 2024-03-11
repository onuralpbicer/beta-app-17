import { computed, inject } from '@angular/core'
import {
    patchState,
    signalStore,
    signalStoreFeature,
    withComputed,
    withHooks,
    withMethods,
    withState,
} from '@ngrx/signals'
import { SyncService } from '../shared/sync.service'
import { firstValueFrom } from 'rxjs'
import { equals, includes } from 'rambda'
import { environment } from 'src/environments/environment'
import { delay } from '../shared/util'

export enum ISyncStatus {
    Initial = 'Initial',
    Checking = 'Checking',
    Syncing = 'Syncing',
    Success = 'Success',
    Failure = 'Failure',
}

export interface ISyncState {
    viewStatus: ISyncStatus
    nextSyncToken: string | null
}

const delayTimeout = environment.production ? 1000 : 0

function withContentful() {
    return signalStoreFeature(
        withState<ISyncState>({
            viewStatus: ISyncStatus.Initial,
            nextSyncToken: null,
        }),
        withComputed((store) => ({
            isInitial: computed(() =>
                equals(store.viewStatus(), ISyncStatus.Initial),
            ),
            isLoading: computed(() =>
                includes(store.viewStatus(), [
                    ISyncStatus.Checking,
                    ISyncStatus.Syncing,
                ]),
            ),
        })),
        withMethods((store, syncService = inject(SyncService)) => ({
            init: async () => {
                patchState(store, { viewStatus: ISyncStatus.Checking })
                const syncCollection = await firstValueFrom(
                    syncService.checkForUpdate(store.nextSyncToken()),
                )

                const hasChange = syncService.hasChange(syncCollection)

                if (!hasChange) {
                    patchState(store, {
                        viewStatus: ISyncStatus.Success,
                    })
                    syncService.goBack()
                    return
                }
                patchState(store, { viewStatus: ISyncStatus.Syncing })

                await delay(delayTimeout)

                await Promise.all([
                    syncService.removeDeletedItems([
                        ...syncCollection.deletedAssets,
                        ...syncCollection.deletedEntries,
                    ]),
                    syncService.storeChangedEntries(syncCollection.entries),
                    syncService.cacheAssets(syncCollection.assets),
                ])
                patchState(store, {
                    viewStatus: ISyncStatus.Success,
                    nextSyncToken: syncCollection.nextSyncToken,
                })

                syncService.goBack()
            },
            test: async () => {
                console.log('test')
            },
        })),
        withHooks({
            onInit: (store, syncService = inject(SyncService)) => {
                if (store.isInitial()) {
                    syncService.goToSync()
                }
                store.init()
            },
        }),
    )
}

export const ContentfulStore = signalStore(
    { providedIn: 'root' },
    withContentful(),
)
