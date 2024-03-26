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
    NavController,
    IonButton,
    IonIcon,
    ViewDidEnter,
    IonSpinner,
} from '@ionic/angular/standalone'
import { IEquipment, IEquipmentTypes } from '../shared/contentful'
import { RoofFanEquipmentComponent } from '../roof-fan-equipment/roof-fan-equipment.component'
import { DatastoreService } from '../shared/datastore.service'
import { Maintenance } from '../API.service'
import { addIcons } from 'ionicons'
import { addOutline } from 'ionicons/icons'
import { ListItemComponent } from '../list-item/list-item.component'

addIcons({
    addOutline,
})

@Component({
    selector: 'beta-app-equipment-page',
    standalone: true,
    imports: [
        IonIcon,
        IonButton,
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
        ListItemComponent,
        IonSpinner,
    ],
    templateUrl: './equipment-page.component.html',
    styleUrl: './equipment-page.component.scss',
})
export class EquipmentPageComponent implements OnInit, ViewDidEnter {
    private equipmentsService = inject(EquipmentsService)
    private datastoreService = inject(DatastoreService)
    private navController = inject(NavController)

    public maintenanceLoading = signal(true)
    public maintenanceList = signal(
        [] as (Pick<Maintenance, 'createdAt'> & { href: string })[],
    )

    public readonly IEquipmentTypes = IEquipmentTypes

    public isLoading = signal(true)
    public entry = signal<IEquipment | undefined>(undefined)

    @Input() equipmentId!: string
    @Input() equipmentTypeId!: string

    async ngOnInit() {
        this.initEquipment()
    }

    async ionViewDidEnter() {
        this.initMaintenances()
    }

    async initEquipment() {
        this.isLoading.set(true)
        const entry = await this.equipmentsService.getEquipment(
            this.equipmentId,
        )
        console.log(entry)

        this.entry.set(entry)
        this.isLoading.set(false)
    }

    async initMaintenances() {
        this.maintenanceLoading.set(true)
        const list = await this.datastoreService.listMaintenances(
            this.equipmentId,
        )
        console.log(list)

        this.maintenanceList.set(
            list.data.listMaintenances.items.map((item) => ({
                createdAt: item.createdAt,
                href:
                    '/equipment-type/' +
                    this.equipmentTypeId +
                    '/equipment/' +
                    this.equipmentId +
                    '/maintenance/' +
                    item.maintenanceId,
            })),
        )
        this.maintenanceLoading.set(false)
    }

    goToMaintenance(maintenanceId?: Maintenance['maintenanceId']) {
        const navigate = [
            'equipment-type',
            this.equipmentTypeId,
            'equipment',
            this.equipmentId,
            'maintenance',
        ]
        if (maintenanceId) {
            navigate.push(maintenanceId)
        }
        this.navController.navigateForward(navigate)
    }
}
