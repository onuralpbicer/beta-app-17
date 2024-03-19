import { Injectable, inject } from '@angular/core'
import {
    Asset,
    AssetFile,
    DeletedAsset,
    DeletedEntry,
    Entry,
    EntrySkeletonType,
    FieldsType,
    createClient,
} from 'contentful'
import { StorageService } from './storage.service'
import {
    Observable,
    defaultIfEmpty,
    firstValueFrom,
    forkJoin,
    from,
    map,
    switchMap,
} from 'rxjs'
import { isNil, isEmpty, equals } from 'rambda'
import { IContentfulEntry, IEquipment, ISyncCollection } from './contentful'
import { HttpClient } from '@angular/common/http'
import { blobToString } from './util'
import { environment } from 'src/environments/environment'
import { NavController } from '@ionic/angular'
import { Location } from '@angular/common'

@Injectable({
    providedIn: 'root',
})
export class SyncService {
    private http = inject(HttpClient)
    private storage = inject(StorageService)
    private navController = inject(NavController)
    private location = inject(Location)

    goToSync() {
        const curPath = this.location.path()
        const params = new URLSearchParams({
            redirectTo: equals(curPath, '/sync') ? '/home' : curPath,
        })
        this.navController.navigateForward('sync' + `?${params.toString()}`, {
            replaceUrl: true,
        })
    }

    private getRedirectPath() {
        const [, queryParams] = this.location.path().split('?')

        if (isNil(queryParams)) return 'home'

        const params = new URLSearchParams(queryParams)
        return params.get('redirectTo') || 'home'
    }

    goBack() {
        this.navController.navigateBack(this.getRedirectPath(), {
            replaceUrl: true,
        })
    }

    checkForUpdate(nextSyncToken: string | null): Observable<ISyncCollection> {
        const config = environment.contentful
        return from(
            createClient(config).sync<
                EntrySkeletonType<NonNullable<unknown>>,
                'WITHOUT_LINK_RESOLUTION'
            >({
                ...(isNil(nextSyncToken)
                    ? { initial: true }
                    : { nextSyncToken }),
            }),
        )
    }

    hasChange(collection: ISyncCollection) {
        return !(
            isEmpty(collection.assets) &&
            isEmpty(collection.entries) &&
            isEmpty(collection.deletedEntries) &&
            isEmpty(collection.deletedAssets)
        )
    }

    private getEntryFields<T extends FieldsType, ID extends string = string>(
        entry: IContentfulEntry<T, ID>,
    ): T {
        const fieldsWithLocale = entry?.fields ?? {}
        return Object.entries(fieldsWithLocale).reduce((acc, [key, value]) => {
            // eslint-disable-next-line no-prototype-builtins
            acc[key] = value.hasOwnProperty('en-US') ? value['en-US'] : value

            return acc
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }, {} as any)
    }

    public getAsset(id: string): Promise<string> {
        return firstValueFrom(this.storage.get(id))
    }

    public getEntry<T extends FieldsType >(
        id: string,
    ): Promise<IContentfulEntry<T>> {
        return firstValueFrom(
            this.storage.get(id).pipe(
                map((result) => {
                    const entry = JSON.parse(result)
                    const fields = this.getEntryFields<T>(entry)
                    return {
                        ...entry,
                        fields,
                    }
                }),
            ),
        )
    }

    public getEquipment(id: string): Promise<IEquipment> {
        return firstValueFrom(
            this.storage.get(id).pipe(
                map((result) => {
                    const entry = JSON.parse(result)
                    const fields = this.getEntryFields(entry)
                    return {
                        ...entry,
                        fields: {
                            ...fields,
                            contentType: entry.sys.contentType.sys.id,
                        },
                    }
                }),
            ),
        )
    }

    public removeDeletedItems(items: (DeletedEntry | DeletedAsset)[]) {
        return forkJoin(
            items.map((item) => this.storage.remove(item.sys.id)),
        ).pipe(defaultIfEmpty([]))
    }

    public storeChangedEntries(entries: ISyncCollection['entries']) {
        return forkJoin(
            entries.map((entry) =>
                this.storage.set(this.getId(entry), JSON.stringify(entry)),
            ),
        ).pipe(defaultIfEmpty([]))
    }

    private storeAsset(asset: Asset, blob: Blob, type: string) {
        return from(blobToString(blob, type)).pipe(
            switchMap((assetString) =>
                this.storage.set(this.getId(asset), assetString),
            ),
        )
    }

    public cacheAssets(assets: ISyncCollection['assets']) {
        return forkJoin(
            assets
                .map((asset) => ({
                    ...asset,
                    file: this.getAssetFile(asset),
                }))
                .map(({ file, ...asset }) =>
                    this.http
                        .get(`https:${file.url}?w=${window.innerWidth}`, {
                            responseType: 'blob',
                        })
                        .pipe(
                            switchMap((blob) =>
                                this.storeAsset(asset, blob, file.contentType),
                            ),
                        ),
                ),
        ).pipe(defaultIfEmpty([]))
    }

    public clearCache() {
        return this.storage.clear()
    }

    private getId(
        entry: Entry<EntrySkeletonType<NonNullable<unknown>>> | Asset,
    ) {
        return entry.sys.id
    }

    private getAssetFile(
        asset: Asset<'WITHOUT_LINK_RESOLUTION' | 'WITH_ALL_LOCALES', string>,
    ): AssetFile {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const file = asset.fields.file as any
        // eslint-disable-next-line no-prototype-builtins
        return file.hasOwnProperty('en-US') ? file['en-US'] : file
    }
}
