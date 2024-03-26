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
            import('./login-page/login-page.component').then(
                (m) => m.LoginPageComponent,
            ),
    },
    {
        path: 'new-password',
        canActivate: [requireNewPasswordGuard, notAuthGuard],
        loadComponent: () =>
            import('./new-password-page/new-password-page.component').then(
                (m) => m.NewPasswordPageComponent,
            ),
    },
    {
        path: 'home',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./home-page/home-page.component').then(
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
                path: ':equipmentTypeId',
                children: [
                    {
                        path: '',

                        loadComponent: () =>
                            import(
                                './equipment-type-page/equipment-type-page.component'
                            ).then((m) => m.EquipmentTypePageComponent),
                    },
                    {
                        path: 'equipment',
                        canActivate: [authGuard],
                        children: [
                            {
                                path: ':equipmentId',
                                children: [
                                    {
                                        path: '',
                                        loadComponent: () =>
                                            import(
                                                './equipment-page/equipment-page.component'
                                            ).then(
                                                (m) => m.EquipmentPageComponent,
                                            ),
                                    },
                                    {
                                        path: 'maintenance',
                                        children: [
                                            {
                                                path: '',
                                                loadComponent: () =>
                                                    import(
                                                        './maintenance-page/maintenance-page.component'
                                                    ).then(
                                                        (m) =>
                                                            m.MaintenancePageComponent,
                                                    ),
                                            },
                                            {
                                                path: 'maintenanceId',
                                                loadComponent: () =>
                                                    import(
                                                        './maintenance-page/maintenance-page.component'
                                                    ).then(
                                                        (m) =>
                                                            m.MaintenancePageComponent,
                                                    ),
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                path: '',
                                pathMatch: 'full',
                                redirectTo: '/',
                            },
                        ],
                    },
                ],
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
