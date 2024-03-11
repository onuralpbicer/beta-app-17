import { Component, inject } from '@angular/core'
import { RouterModule } from '@angular/router'
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone'
import { StorageService } from './shared/storage.service'

@Component({
    standalone: true,
    imports: [IonRouterOutlet, IonApp, RouterModule],
    selector: 'beta-app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    private _storage = inject(StorageService)
    title = 'beta-app'
}
