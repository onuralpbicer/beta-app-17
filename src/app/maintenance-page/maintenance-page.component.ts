import {
    Component,
    Input,
    OnDestroy,
    OnInit,
    inject,
    signal,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { EquipmentsService } from '../shared/equipments.service'
import {
    FormArray,
    FormBuilder,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms'
import { IMaintenanceTask } from './model'
import { Subscription } from 'rxjs'
import {
    IonContent,
    IonToolbar,
    IonTitle,
    IonBackButton,
    IonButton,
    IonButtons,
    IonHeader,
    IonSelectOption,
    IonSelect,
    IonSegmentButton,
    IonLabel,
    IonSpinner,
    IonInput,
    IonSegment,
    NavController,
    IonSkeletonText,
} from '@ionic/angular/standalone'
import { TripleSelectorComponent } from '../triple-selector/triple-selector.component'
import { ToastService } from '../shared/toast.service'
import { MESSAGES } from '../shared/messages'
import { DatastoreService } from '../shared/datastore.service'

@Component({
    selector: 'beta-app-maintenance-page',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        IonContent,
        IonToolbar,
        IonTitle,
        IonBackButton,
        IonButton,
        IonButtons,
        IonHeader,
        CommonModule,
        IonSelectOption,
        IonSelect,
        IonSegment,
        IonSegmentButton,
        IonLabel,
        IonSpinner,
        IonInput,
        TripleSelectorComponent,
        IonSkeletonText,
    ],
    templateUrl: './maintenance-page.component.html',
    styleUrl: './maintenance-page.component.scss',
})
export class MaintenancePageComponent implements OnInit, OnDestroy {
    private equipmentsService = inject(EquipmentsService)
    private fb = inject(FormBuilder)
    private toastService = inject(ToastService)
    private datastoreService = inject(DatastoreService)
    private navController = inject(NavController)

    @Input() equipmentId!: string
    @Input() equipmentTypeId!: string
    @Input() maintenanceId!: string

    get viewonly() {
        return Boolean(this.maintenanceId)
    }
    public isLoading = signal(true)
    public submitting = signal(false)

    public formSubscriptions: Array<Subscription> = []

    public form = this.fb.group({
        type: this.fb.nonNullable.control<string | null>(
            null,
            Validators.required,
        ),
        comments: this.fb.nonNullable.control<string | null>(null),
        maintenanceTasks: this.fb.nonNullable.array<IMaintenanceTask>([]),
    })

    get maintenanceTasks() {
        return this.form.controls.maintenanceTasks
    }

    async ngOnInit() {
        this.isLoading.set(true)
        const equipmentType = await this.equipmentsService.getEquipmentType(
            this.equipmentTypeId,
        )
        this.initialiseForm(equipmentType.fields.maintenanceTasks)

        if (this.viewonly) {
            await this.initialiseMaintenance()
        }

        this.isLoading.set(false)
    }

    ngOnDestroy(): void {
        this.formSubscriptions.forEach((subscription) =>
            subscription.unsubscribe(),
        )
    }

    public async initialiseMaintenance() {
        const maintenance = await this.datastoreService.getMaintenance(
            this.equipmentId,
            this.maintenanceId,
        )

        const tasks: IMaintenanceTask[] = JSON.parse(maintenance?.tasks ?? '[]')

        console.log(tasks)
        this.form.reset({
            type: maintenance?.maintenanceType,
            comments: maintenance?.comments,
        })
        this.form.controls.maintenanceTasks.controls.forEach(
            (control, index) => {
                control.reset(tasks[index])
                control.disable()
            },
        )
        this.form.disable()
    }

    public initialiseForm(maintenanceTasks: string[]) {
        const maintenanceTasksControl = this.form.controls[
            'maintenanceTasks'
        ] as FormArray

        this.form.reset()
        maintenanceTasksControl.clear()

        maintenanceTasks.forEach((task) => {
            const fg = this.fb.group({
                name: [task],
                description: [undefined],
                uygun: [null, Validators.required],
                yapilanIs: [null],
            })

            this.formSubscriptions.push(
                fg.controls.uygun.valueChanges.subscribe((value) => {
                    fg.markAsTouched()

                    const control = fg.controls['yapilanIs']

                    if (value === true) {
                        control.clearValidators()
                    } else {
                        control.addValidators(Validators.required)
                    }
                    control.updateValueAndValidity()
                }),
            )
            maintenanceTasksControl.push(fg)
        })
    }

    public async submit() {
        if (this.form.invalid || this.submitting()) {
            return
        }

        this.submitting.set(true)
        try {
            this.datastoreService.createMaintenance(this.equipmentId, {
                maintenanceType: this.form.value.type as string,
                tasks: JSON.stringify(this.form.value.maintenanceTasks ?? []),
                comments: this.form.value.comments,
            })

            this.toastService.showSuccessToast(MESSAGES.submitSuccess)
            this.navController.back()
        } catch (e) {
            this.toastService.showErrorToast(MESSAGES.submitFail)
        } finally {
            this.submitting.set(false)
        }

        console.log('data', this.form.value)
    }
}
