import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AuthService } from '../shared/auth.service'
import {
    IonContent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonIcon,
} from '@ionic/angular/standalone'
import { addIcons } from 'ionicons'
import { logOutOutline } from 'ionicons/icons'
import { ContentfulStore } from '../stores/contentful.feature'

addIcons({
    logOutOutline,
})

@Component({
    selector: 'beta-app-home-page',
    standalone: true,
    imports: [
        IonIcon,
        IonButton,
        IonButtons,
        IonToolbar,
        IonHeader,
        IonContent,
        CommonModule,
    ],
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
    private authService = inject(AuthService)
    private contentfulStore = inject(ContentfulStore)

    public syncStatus = this.contentfulStore.viewStatus
    public syncToken = this.contentfulStore.nextSyncToken

    logout() {
        this.authService.logout()
    }
}
