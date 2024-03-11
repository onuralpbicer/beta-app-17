import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { AuthService } from '../auth.service'
import { from, map } from 'rxjs'

export const requireNewPasswordGuard: CanActivateFn = () => {
    const authService = inject(AuthService)
    const router = inject(Router)

    return authService.requireNewPassword$.pipe(
        map(
            (requireNewPassword) =>
                requireNewPassword || router.createUrlTree(['login']),
        ),
    )
}

export const authGuard: CanActivateFn = () => {
    const authService = inject(AuthService)
    const router = inject(Router)

    return from(authService.isLoggedIn()).pipe(
        map((user) => user || router.createUrlTree(['login'])),
    )
}

export const notAuthGuard: CanActivateFn = () => {
    const authService = inject(AuthService)
    const router = inject(Router)

    return from(authService.isLoggedIn()).pipe(
        map((user) => (user ? router.createUrlTree(['home']) : true)),
    )
}
