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
            import('./home/home-page.component').then(
                (m) => m.HomePageComponent,
            ),
    },
    {
        path: 'sync',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./sync-page/sync-page.component').then(
                (m) => m.SyncPageComponent,
            ),
    },
    {
        path: 'equipment-type',
        canActivate: [authGuard],
        children: [
            {
                path: ':id',
                loadComponent: () =>
                    import(
                        './equipment-type-page/equipment-type-page.component'
                    ).then((m) => m.EquipmentTypePageComponent),
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: '/',
            },
        ],
    },
    {
        path: 'equipment',
        canActivate: [authGuard],
        children: [
            {
                path: ':id',
                loadComponent: () =>
                    import('./equipment-page/equipment-page.component').then(
                        (m) => m.EquipmentPageComponent,
                    ),
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: '/',
            },
        ],
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
