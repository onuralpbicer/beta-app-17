import { createFeature, createReducer, createSelector, on } from '@ngrx/store'
import { syncActions } from './sync.action'
import { ISyncStatus } from '../shared/model'
import { complement, equals, includes } from 'rambda'

export interface ISyncState {
    viewStatus: ISyncStatus
    nextSyncToken: string | null
}

const initialValue: ISyncState = {
    viewStatus: ISyncStatus.Initial,
    nextSyncToken: null,
}

export const syncFeaturePersistenceKeys = Object.keys(initialValue).filter(
    complement(equals('viewStatus')),
)

const feature = createFeature({
    name: 'sync',
    reducer: createReducer(
        initialValue,
        on(syncActions.init, (state) => ({
            ...state,
            viewStatus: ISyncStatus.Checking,
        })),
        on(syncActions.start, (state) => ({
            ...state,
            viewStatus: ISyncStatus.Syncing,
        })),
        on(syncActions.complete, (state, { nextSyncToken }) => ({
            ...state,
            viewStatus: ISyncStatus.Success,
            nextSyncToken: nextSyncToken || state.nextSyncToken,
        })),
        on(syncActions.failure, (state) => ({
            ...state,
            viewStatus: ISyncStatus.Failure,
        })),
    ),
    extraSelectors: (baseSelectors) => ({
        selectIsInitial: createSelector(
            baseSelectors.selectViewStatus,
            equals(ISyncStatus.Initial),
        ),
        selectIsLoading: createSelector(
            baseSelectors.selectViewStatus,
            (viewStatus) =>
                includes(viewStatus, [
                    ISyncStatus.Checking,
                    ISyncStatus.Syncing,
                ]),
        ),
    }),
})

export const {
    name: syncFeatureKey,
    reducer: syncReducer,
    selectIsInitial,
    selectIsLoading,
    selectNextSyncToken,
    selectViewStatus,
} = feature
