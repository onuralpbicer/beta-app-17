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
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
} from '@ionic/angular/standalone'
import { IEquipment, IEquipmentTypes } from '../shared/contentful'
import { RoofFanEquipmentComponent } from '../roof-fan-equipment/roof-fan-equipment.component'
import { DatastoreService } from '../shared/datastore.service'
import { Maintenance } from '../API.service'

@Component({
    selector: 'beta-app-equipment-page',
    standalone: true,
    imports: [
        IonListHeader,
        IonTitle,
        IonBackButton,
        IonButtons,
        IonToolbar,
        IonHeader,
        IonContent,
        CommonModule,
        IonItem,
        IonLabel,
        IonList,
        RoofFanEquipmentComponent,
    ],
    templateUrl: './equipment-page.component.html',
    styleUrl: './equipment-page.component.scss',
})
export class EquipmentPageComponent implements OnInit {
    private equipmentsService = inject(EquipmentsService)
    private datastoreService = inject(DatastoreService)

    public maintenanceLoading = signal(false)
    public maintenanceList = signal([] as Maintenance[])

    public readonly IEquipmentTypes = IEquipmentTypes

    public isLoading = signal(true)
    public entry = signal<IEquipment | undefined>(undefined)

    @Input() id!: string

    async ngOnInit() {
        this.initEquipment()
        this.initMaintenances()
    }

    async initEquipment() {
        this.isLoading.set(true)
        const entry = await this.equipmentsService.getEquipment(this.id)
        console.log(entry)

        this.entry.set(entry)
        this.isLoading.set(false)
    }

    async initMaintenances() {
        this.maintenanceLoading.set(true)
        const list = await this.datastoreService.listMaintenances(this.id)
        console.log(list)

        this.maintenanceList.set(list.data.listMaintenances.items)
        this.maintenanceLoading.set(false)
    }
}
