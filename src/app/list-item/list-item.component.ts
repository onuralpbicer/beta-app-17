import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IonItem, IonLabel } from '@ionic/angular/standalone'

@Component({
    selector: 'beta-app-list-item',
    standalone: true,
    imports: [IonLabel, IonItem, CommonModule],
    templateUrl: './list-item.component.html',
    styleUrl: './list-item.component.scss',
})
export class ListItemComponent {
    @Input() id!: string
    @Input() name!: string
}
