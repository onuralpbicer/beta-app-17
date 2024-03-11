import { Component, Input, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IonItem, IonLabel, NavController } from '@ionic/angular/standalone'

@Component({
    selector: 'beta-app-list-item',
    standalone: true,
    imports: [IonLabel, IonItem, CommonModule],
    templateUrl: './list-item.component.html',
    styleUrl: './list-item.component.scss',
})
export class ListItemComponent {
    private navController = inject(NavController)

    @Input() href!: string
    @Input() name!: string

    handleClick() {
        this.navController.navigateForward(this.href)
    }
}
