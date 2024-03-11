import { Component, OnInit, inject } from '@angular/core'
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
import { SyncService } from '../shared/sync.service'

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
export class HomePageComponent implements OnInit {
    private authService = inject(AuthService)
    private contentfulStore = inject(ContentfulStore)
    private syncService = inject(SyncService)

    public syncStatus = this.contentfulStore.viewStatus
    public syncToken = this.contentfulStore.nextSyncToken

    ngOnInit(): void {
        this.syncService
            .getEntry('1AIjuFl5qqnHoD95dBbQ7H')
            .subscribe(console.log)
    }

    logout() {
        this.authService.logout()
    }
}
