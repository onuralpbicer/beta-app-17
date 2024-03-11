import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ViewStatus } from '../shared/types'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { AuthService } from '../shared/auth.service'

@Component({
    selector: 'beta-app-new-password',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './new-password.component.html',
    styleUrl: './new-password.component.scss',
})
export class NewPasswordComponent {
    private fb = inject(FormBuilder)
    private authService = inject(AuthService)

    public form = this.fb.group(
        {
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required],
        },
        {
            validators: [],
        },
    )

    public viewStatus = ViewStatus.INITIAL

    async submit() {
        if (this.form.invalid) {
            return
        }

        const { password, confirmPassword } = this.form.value

        if (!confirmPassword || !password || password !== confirmPassword) {
            return
        }

        try {
            await this.authService.completeNewPassword(password)
            this.viewStatus = ViewStatus.SUCCESS
        } catch (error) {
            console.error(error)
            this.viewStatus = ViewStatus.FAILURE
        }
    }
}
