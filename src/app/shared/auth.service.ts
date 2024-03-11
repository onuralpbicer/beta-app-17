import { Injectable, inject } from '@angular/core'
import { NavController } from '@ionic/angular'
import { CUSTOM_CHANNEL } from './types'
// import { DatastoreService } from './datastore.service'
import { ToastService } from './toast.service'
import { MESSAGES } from './messages'
import { Hub } from '@aws-amplify/core'
import {
    signOut,
    signIn,
    confirmSignIn,
    getCurrentUser,
} from '@aws-amplify/auth'
import { BehaviorSubject } from 'rxjs'

const requiresNewPasswordEvent = 'require-new-password'

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private toastService = inject(ToastService)
    private navContoller = inject(NavController)

    constructor() {
        Hub.listen('auth', async ({ payload: { event } }) => {
            console.log('hub event', 'auth', event)
            switch (event) {
                case 'signedIn':
                    // await this.datastore.init()
                    this.toastService.showSuccessToast(MESSAGES.loginSuccess)
                    this.navContoller.navigateForward('home', {
                        replaceUrl: true,
                    })
                    break

                // case 'signIn_failure':
                //     // await this.datastore.stop()
                //     this.toastService.showErrorToast(MESSAGES.loginFail)
                //     this.navContoller.navigateBack('login')
                //     break

                case 'signedOut':
                    // await this.datastore.stop()
                    this.toastService.showSuccessToast(MESSAGES.logoutSuccess)
                    this.navContoller.navigateBack('login')
                    break
            }
        })
        Hub.listen(CUSTOM_CHANNEL, ({ payload: { event, data } }) => {
            console.log('hub event', CUSTOM_CHANNEL, event, data)
            switch (event) {
                case requiresNewPasswordEvent:
                    this.requireNewPassword$.next(true)
                    this.navContoller.navigateForward('new-password', {
                        replaceUrl: true,
                    })
                    break
            }
        })
    }

    public requireNewPassword$ = new BehaviorSubject(false)

    public async logout() {
        await signOut()
    }

    public async login(username: string, password: string) {
        try {
            const user = await signIn({
                username,
                password,
                options: {
                    authFlowType: 'USER_SRP_AUTH',
                },
            })

            if (
                user.nextStep.signInStep ===
                'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED'
            ) {
                Hub.dispatch(CUSTOM_CHANNEL, {
                    event: requiresNewPasswordEvent,
                })
            }
        } catch (e) {
            console.log('error while signing in', e)
            this.toastService.showErrorToast(MESSAGES.loginFail)
        }
    }

    public async signout() {
        try {
            await signOut()
        } catch (error) {
            console.log('error signing out: ', error)
        }
    }

    public async completeNewPassword(password: string) {
        await confirmSignIn({
            challengeResponse: password,
        })

        this.requireNewPassword$.next(false)
    }

    public getCurrentUser() {
        return getCurrentUser()
    }

    public async isLoggedIn() {
        try {
            const user = await getCurrentUser()
            return !!user
        } catch (e) {
            return false
        }
    }

    public async getUserId() {
        const user = await this.getCurrentUser()
        return user.username
    }
}
