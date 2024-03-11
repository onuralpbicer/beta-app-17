import {
    Component,
    Input,
    OnInit,
    computed,
    inject,
    signal,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { EquipmentsService } from '../shared/equipments.service'
import { ListPage } from '../shared/model'
import {
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonContent,
    IonList,
    IonTitle,
} from '@ionic/angular/standalone'
import { ListItemComponent } from '../list-item/list-item.component'

@Component({
    selector: 'beta-app-equipment-type',
    standalone: true,
    imports: [
        IonTitle,
        IonList,
        IonContent,
        IonBackButton,
        IonButtons,
        IonToolbar,
        IonHeader,
        CommonModule,
        ListItemComponent,
    ],
    templateUrl: './equipment-type-page.component.html',
    styleUrl: './equipment-type-page.component.scss',
})
export class EquipmentTypePageComponent implements OnInit {
    private equipmentsService = inject(EquipmentsService)

    public isLoading = signal(true)
    public entry = signal<ListPage | undefined>(undefined)

    public items = computed(() => {
        const loading = this.isLoading()
        if (loading) return []
        return (
            this.entry()?.items?.map((item) => ({
                ...item,
                href: '/equipment/' + item.link,
            })) ?? []
        )
    })

    @Input() id!: string

    async ngOnInit() {
        this.isLoading.set(true)
        const entry = await this.equipmentsService.getEquipmentList(this.id)

        this.entry.set(entry)
        this.isLoading.set(false)
    }
}
