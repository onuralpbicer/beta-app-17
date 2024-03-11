import { ApplicationConfig, importProvidersFrom } from '@angular/core'
import { provideRouter, withComponentInputBinding } from '@angular/router'
import { appRoutes } from './app.routes'
import { provideIonicAngular } from '@ionic/angular/standalone'
import { provideHttpClient } from '@angular/common/http'
import { IonicStorageModule } from '@ionic/storage-angular'
import { Drivers } from '@ionic/storage'

export const appConfig: ApplicationConfig = {
    providers: [
        provideHttpClient(),
        provideRouter(appRoutes, withComponentInputBinding()),
        provideIonicAngular({}),
        importProvidersFrom(
            IonicStorageModule.forRoot({
                driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage],
            }),
        ),
    ],
}
