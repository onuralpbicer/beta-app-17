import { Component, Input, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IRoofFan } from '../shared/contentful'
import {
    IonItem,
    IonLabel,
    IonList,
    IonCol,
    IonRow,
} from '@ionic/angular/standalone'

@Component({
    selector: 'beta-app-roof-fan-equipment',
    standalone: true,
    imports: [IonRow, IonCol, IonList, IonLabel, IonItem, CommonModule],
    templateUrl: './roof-fan-equipment.component.html',
    styleUrl: './roof-fan-equipment.component.scss',
})
export class RoofFanEquipmentComponent implements OnInit {
    @Input() equipment!: IRoofFan

    ngOnInit(): void {
        console.log('inner', this.equipment)
    }
}
