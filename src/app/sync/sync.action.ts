import { createActionGroup, emptyProps, props } from '@ngrx/store'
import { ISyncCollection } from '../shared/contentful'

export const syncActions = createActionGroup({
    source: 'Sync',
    events: {
        init: emptyProps(),
        start: props<{ syncCollection: ISyncCollection }>(),
        complete: props<{ nextSyncToken?: string }>(),
        failure: emptyProps(),
    },
})
