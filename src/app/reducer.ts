import { ActionReducerMap, Action, MetaReducer } from '@ngrx/store'
import { localStorageSync } from 'ngrx-store-localstorage'
import { syncFeatureKey, syncFeaturePersistenceKeys } from './sync/sync.feature'

export const reducers: ActionReducerMap<unknown, Action> = {}
export const metaReducers: MetaReducer<object, Action>[] = [
    localStorageSync({
        keys: [{ [syncFeatureKey]: syncFeaturePersistenceKeys }],
        storageKeySerializer: (key) => `beta-app-${key}`,
        rehydrate: true,
    }),
]
