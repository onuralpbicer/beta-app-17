import { effect } from '@angular/core'
import { signalStoreFeature, withHooks, getState } from '@ngrx/signals'
import { mergeDeepLeft, pick } from 'rambda'

const prefix = 'SIGNALSTORE.'

export function persistSignalStore<T extends object>(
    initialState: T,
    persistenceKeys: string | Record<string, Array<keyof T>>,
) {
    const persistenceKey =
        typeof persistenceKeys === 'string'
            ? persistenceKeys
            : Object.keys(persistenceKeys)[0]

    return {
        getInitialState() {
            const savedState = localStorage.getItem(prefix + persistenceKey)
            if (savedState) {
                return mergeDeepLeft<T>(JSON.parse(savedState), initialState)
            }
            return initialState
        },
        withLocalStorage() {
            return signalStoreFeature(
                withHooks({
                    onInit: (store) => {
                        effect(() => {
                            const state = getState(store)

                            const saveState =
                                typeof persistenceKeys === 'string'
                                    ? state
                                    : pick(
                                          Object.values(persistenceKeys)[0],
                                          state,
                                      )

                            localStorage.setItem(
                                prefix + persistenceKey,
                                JSON.stringify(saveState),
                            )
                        })
                    },
                }),
            )
        },
    }
}
