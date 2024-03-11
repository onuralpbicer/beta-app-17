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
import { AuthService } from '../shared/auth.service'
import { ViewStatus } from '../shared/types'

@Component({
    selector: 'beta-app-login-page',
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
    templateUrl: './login-page.component.html',
    styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
    private fb = inject(FormBuilder)
    private authService = inject(AuthService)

    public viewStatus = ViewStatus.INITIAL
    public readonly ViewStatus = ViewStatus

    public form = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
    })

    async handleSubmit() {
        if (this.form.invalid) return

        const { username, password } = this.form.value

        if (!username || !password) {
            return
        }

        this.viewStatus = ViewStatus.LOADING

        try {
            await this.authService.login(username, password)
            this.viewStatus = ViewStatus.SUCCESS
        } catch (error) {
            console.error(error)
            this.viewStatus = ViewStatus.FAILURE
        }
    }
}
