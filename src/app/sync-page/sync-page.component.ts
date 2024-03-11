import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ContentfulStore, ISyncStatus } from '../stores/contentful.feature'
import {
    IonSpinner,
    IonText,
    IonIcon,
    IonContent,
} from '@ionic/angular/standalone'
import { addIcons } from 'ionicons'
import { closeOutline, checkmarkOutline } from 'ionicons/icons'

addIcons({
    closeOutline,
    checkmarkOutline,
})

@Component({
    selector: 'beta-app-sync-page',
    standalone: true,
    imports: [IonContent, IonIcon, IonText, IonSpinner, CommonModule],
    templateUrl: './sync-page.component.html',
    styleUrl: './sync-page.component.scss',
})
export class SyncPageComponent {
    private contentfulStore = inject(ContentfulStore)

    public isLoading = this.contentfulStore.isLoading
    public syncStatus = this.contentfulStore.viewStatus

    public SyncStatus = ISyncStatus
}
