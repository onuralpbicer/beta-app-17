import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import {
    IonSpinner,
    IonText,
    IonIcon,
    IonContent,
} from '@ionic/angular/standalone'
import { addIcons } from 'ionicons'
import { closeOutline, checkmarkOutline } from 'ionicons/icons'
import { ISyncStatus } from '../shared/model'
import { Store } from '@ngrx/store'
import { selectIsLoading, selectViewStatus } from '../sync/sync.feature'

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
    private store = inject(Store)

    public isLoading$ = this.store.select(selectIsLoading)
    public syncStatus$ = this.store.select(selectViewStatus)

    public SyncStatus = ISyncStatus
}
