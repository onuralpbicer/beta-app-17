import { ApplicationConfig, importProvidersFrom } from '@angular/core'
import { provideRouter, withComponentInputBinding } from '@angular/router'
import { appRoutes } from './app.routes'
import { provideIonicAngular } from '@ionic/angular/standalone'
import { provideHttpClient } from '@angular/common/http'
import { IonicStorageModule } from '@ionic/storage-angular'
import { Drivers } from '@ionic/storage'
import { provideState, provideStore } from '@ngrx/store'
import { provideEffects } from '@ngrx/effects'
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { syncFeatureKey, syncReducer } from './sync/sync.feature'
import { metaReducers, reducers } from './reducer'
import { SyncEffects } from './sync/sync.effects'
import { AuthEffects } from './auth/auth.effects'

export const appConfig: ApplicationConfig = {
    providers: [
        provideHttpClient(),
        provideRouter(appRoutes, withComponentInputBinding()),
        provideIonicAngular({
            backButtonDefaultHref: '/',
            backButtonText: '',
        }),
        importProvidersFrom(
            IonicStorageModule.forRoot({
                driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage],
            }),
        ),
        provideStore(reducers, {
            metaReducers,
        }),
        provideEffects(SyncEffects, AuthEffects),
        provideState(syncFeatureKey, syncReducer),
        provideStoreDevtools(),
    ],
}
