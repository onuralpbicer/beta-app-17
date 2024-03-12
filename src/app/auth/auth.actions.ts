import { createActionGroup, emptyProps } from '@ngrx/store'

export const authActions = createActionGroup({
    source: 'auth',
    events: {
        login: emptyProps(),
        loginSuccess: emptyProps(),
        loginFailure: emptyProps(),
        forceLogout: emptyProps(),
        logout: emptyProps(),
    },
})
