import { Injectable, inject } from '@angular/core'
import { Storage } from '@ionic/storage-angular'
import {
    BehaviorSubject,
    Observable,
    filter,
    from,
    switchMap,
    take,
    timeout,
} from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class StorageService {
    private storage = inject(Storage)

    private _storage!: Storage
    private readonly defaultTimeout = 3000

    private storageReady = new BehaviorSubject(false)

    constructor() {
        this.init()
    }

    private async init() {
        const storage = await this.storage.create()
        this._storage = storage
        this.storageReady.next(true)
    }

    private runWhenReady<T>(
        innerObservable: Observable<T>,
        timeoutDuration?: number,
    ): Observable<T> {
        return this.notifyWhenReady(timeoutDuration).pipe(
            switchMap(() => innerObservable),
        )
    }

    public get(key: string) {
        return this.runWhenReady(from(this._storage.get(key)))
    }

    public notifyWhenReady(timeoutDuration?: number) {
        return this.storageReady.pipe(
            filter(Boolean),
            take(1),
            timeout({ first: timeoutDuration ?? this.defaultTimeout }),
        )
    }

    public set(key: string, value: string) {
        return this.runWhenReady(from(this._storage.set(key, value)))
    }

    public remove(key: string) {
        return this.runWhenReady(from(this._storage.remove(key)))
    }

    public clear() {
        return this.runWhenReady(from(this._storage.clear()))
    }
}
