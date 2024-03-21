import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import {
    IonHeader,
    IonButtons,
    IonButton,
    IonBackButton,
    IonTitle,
    IonToolbar,
    IonContent,
} from '@ionic/angular/standalone'

@Component({
    selector: 'beta-app-maintenance-page',
    standalone: true,
    imports: [
        IonContent,
        IonToolbar,
        IonTitle,
        IonBackButton,
        IonButton,
        IonButtons,
        IonHeader,
        CommonModule,
    ],
    templateUrl: './maintenance-page.component.html',
    styleUrl: './maintenance-page.component.scss',
})
export class MaintenancePageComponent {}
