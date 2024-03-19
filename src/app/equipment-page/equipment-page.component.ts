import { Component, Input, OnInit, inject, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { EquipmentsService } from '../shared/equipments.service'
import {
    IonContent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
} from '@ionic/angular/standalone'

@Component({
    selector: 'beta-app-equipment-page',
    standalone: true,
    imports: [
        IonTitle,
        IonBackButton,
        IonButtons,
        IonToolbar,
        IonHeader,
        IonContent,
        CommonModule,
    ],
    templateUrl: './equipment-page.component.html',
    styleUrl: './equipment-page.component.scss',
})
export class EquipmentPageComponent implements OnInit {
    private equipmentsService = inject(EquipmentsService)

    public isLoading = signal(true)
    public entry = signal<any | undefined>(undefined)

    @Input() id!: string

    async ngOnInit() {
        this.isLoading.set(true)
        const entry = await this.equipmentsService.getEquipment(this.id)
        console.log(entry)

        this.entry.set(entry.equipment)
        this.isLoading.set(false)
    }
}
