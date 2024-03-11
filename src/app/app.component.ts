import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone'

@Component({
    standalone: true,
    imports: [IonRouterOutlet, IonApp, RouterModule],
    selector: 'beta-app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    title = 'beta-app'
}
