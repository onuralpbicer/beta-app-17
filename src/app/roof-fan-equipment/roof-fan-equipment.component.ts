import { Component, Input, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IRoofFan } from '../shared/contentful'

@Component({
    selector: 'beta-app-roof-fan-equipment',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './roof-fan-equipment.component.html',
    styleUrl: './roof-fan-equipment.component.scss',
})
export class RoofFanEquipmentComponent implements OnInit {
    @Input() equipment!: IRoofFan

    ngOnInit(): void {
        console.log('inner', this.equipment)
    }
}
