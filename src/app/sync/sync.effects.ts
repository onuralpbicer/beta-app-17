import { Injectable, inject } from '@angular/core'
import { Actions, createEffect, ofType, rootEffectsInit } from '@ngrx/effects'
import {
    catchError,
    debounceTime,
    defaultIfEmpty,
    delay,
    filter,
    forkJoin,
    map,
    of,
    switchMap,
    tap,
    withLatestFrom,
} from 'rxjs'
import { AuthService } from '../shared/auth.service'
import { syncActions } from './sync.action'
import { SyncService } from '../shared/sync.service'
import { environment } from 'src/environments/environment'
import { Store } from '@ngrx/store'
import { selectNextSyncToken } from './sync.feature'

rootEffectsInit
@Injectable()
export class SyncEffects {
    private store = inject(Store)
    private action$ = inject(Actions)
    private authService = inject(AuthService)
    private syncService = inject(SyncService)

    private readonly delayTimeout = environment.production ? 1000 : 0

    public test$ = createEffect(() =>
        this.action$.pipe(
            ofType(rootEffectsInit),
            debounceTime(1),
            withLatestFrom(this.authService.isLoggedIn()),
            filter(([, isLoggedIn]) => isLoggedIn),
            map(() => syncActions.init()),
        ),
    )

    public syncInit$ = createEffect(() =>
        this.action$.pipe(
            ofType(syncActions.init),
            tap(() => this.syncService.goToSync()),
            delay(this.delayTimeout),
            withLatestFrom(this.store.select(selectNextSyncToken)),
            switchMap(([, nextSyncToken]) =>
                this.syncService
                    .checkForUpdate(nextSyncToken)
                    .pipe(
                        map((syncCollection) =>
                            this.syncService.hasChange(syncCollection)
                                ? syncActions.start({ syncCollection })
                                : syncActions.complete(syncCollection),
                        ),
                    ),
            ),
            catchError((error) => {
                console.error(error)
                return of(syncActions.failure())
            }),
        ),
    )

    public syncStart$ = createEffect(() =>
        this.action$.pipe(
            ofType(syncActions.start),
            delay(this.delayTimeout),
            switchMap(({ syncCollection }) =>
                forkJoin([
                    this.syncService.removeDeletedItems([
                        ...syncCollection.deletedAssets,
                        ...syncCollection.deletedEntries,
                    ]),
                    this.syncService.storeChangedEntries(
                        syncCollection.entries,
                    ),
                    this.syncService.cacheAssets(syncCollection.assets),
                ]).pipe(
                    defaultIfEmpty([]),
                    map(() =>
                        syncActions.complete({
                            nextSyncToken: syncCollection.nextSyncToken,
                        }),
                    ),
                ),
            ),
            catchError((error) => {
                console.error(error)
                return of(syncActions.failure())
            }),
        ),
    )

    syncSuccess$ = createEffect(
        () =>
            this.action$.pipe(
                ofType(syncActions.complete),
                tap(() => {
                    this.syncService.goBack()
                }),
            ),
        {
            dispatch: false,
        },
    )
}
