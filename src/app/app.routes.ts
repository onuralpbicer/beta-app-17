import { Route } from '@angular/router'
import {
    authGuard,
    notAuthGuard,
    requireNewPasswordGuard,
} from './shared/guards/auth.guard'

export const appRoutes: Route[] = [
    {
        path: 'login',
        canActivate: [notAuthGuard],
        loadComponent: () =>
            import('./login/login.component').then((m) => m.LoginComponent),
    },
    {
        path: 'new-password',
        canActivate: [requireNewPasswordGuard, notAuthGuard],
        loadComponent: () =>
            import('./new-password/new-password.component').then(
                (m) => m.NewPasswordComponent,
            ),
    },
    {
        path: 'home',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./home/home.component').then((m) => m.HomeComponent),
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: '**',
        redirectTo: '',
    },
]
