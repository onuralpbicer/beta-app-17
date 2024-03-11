import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import {
    IonButton,
    IonCard,
    IonContent,
    IonInput,
    IonSpinner,
} from '@ionic/angular/standalone'

@Component({
    selector: 'beta-app-login',
    standalone: true,
    imports: [
        IonContent,
        CommonModule,
        ReactiveFormsModule,
        IonCard,
        IonInput,
        IonButton,
        IonSpinner,
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
})
export class LoginComponent {
    private fb = inject(FormBuilder)

    public form = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
    })

    async handleSubmit() {
        if (this.form.invalid) return

        console.log(this.form.value)
    }
}
