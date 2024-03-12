import { Injectable, inject } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { authActions } from './auth.actions'
import { catchError, from, map, of, retry, switchMap, tap } from 'rxjs'
import { AuthService } from '../shared/auth.service'
import { NavController } from '@ionic/angular'
import { MESSAGES } from '../shared/messages'
import { ToastService } from '../shared/toast.service'

@Injectable()
export class AuthEffects {
    private action$ = inject(Actions)
    private authService = inject(AuthService)
    private toastService = inject(ToastService)
    private navContoller = inject(NavController)

    public login$ = createEffect(() =>
        this.action$.pipe(
            ofType(authActions.login),
            switchMap(() =>
                from(this.authService.getCurrentUser()).pipe(
                    retry(3),
                    map(() => authActions.loginSuccess()),
                    catchError((error) => {
                        console.log('error while logging in', error)
                        return of(authActions.loginFailure())
                    }),
                ),
            ),
        ),
    )

    public loginSuccess$ = createEffect(
        () =>
            this.action$.pipe(
                ofType(authActions.loginSuccess),
                tap(() => {
                    this.toastService.showSuccessToast(MESSAGES.loginSuccess)
                    this.navContoller.navigateForward('home', {
                        replaceUrl: true,
                    })
                }),
            ),
        {
            dispatch: false,
        },
    )

    public forceLogout$ = createEffect(
        () =>
            this.action$.pipe(
                ofType(authActions.forceLogout, authActions.loginFailure),
                tap(() => this.authService.logout()),
            ),
        {
            dispatch: false,
        },
    )

    public logout$ = createEffect(
        () =>
            this.action$.pipe(
                ofType(authActions.logout),
                tap(() => {
                    this.toastService.showSuccessToast(MESSAGES.logoutSuccess)
                    this.navContoller.navigateBack('login')
                }),
            ),
        {
            dispatch: false,
        },
    )
}
