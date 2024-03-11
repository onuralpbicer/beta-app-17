import { Component, OnInit, computed, inject, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AuthService } from '../shared/auth.service'
import {
    IonContent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonIcon,
    IonTitle,
    IonList,
} from '@ionic/angular/standalone'
import { addIcons } from 'ionicons'
import { logOutOutline } from 'ionicons/icons'
import { EquipmentsService } from '../shared/equipments.service'
import { ListPage } from '../shared/model'
import { ListItemComponent } from '../list-item/list-item.component'

addIcons({
    logOutOutline,
})

@Component({
    selector: 'beta-app-home-page',
    standalone: true,
    imports: [
        IonList,
        IonTitle,
        IonIcon,
        IonButton,
        IonButtons,
        IonToolbar,
        IonHeader,
        IonContent,
        CommonModule,
        ListItemComponent,
    ],
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
    private authService = inject(AuthService)
    private equipmentsService = inject(EquipmentsService)

    public isLoading = signal(true)
    public entry = signal<ListPage | undefined>(undefined)

    public items = computed(() => {
        const loading = this.isLoading()
        if (loading) return []
        return (
            this.entry()?.items?.map((item) => ({
                ...item,
                href: '/equipment-type/' + item.link,
            })) ?? []
        )
    })

    async ngOnInit() {
        this.isLoading.set(true)
        const entry = await this.equipmentsService.getEquipmentList()

        this.entry.set(entry)
        this.isLoading.set(false)
    }

    logout() {
        this.authService.logout()
    }
}
