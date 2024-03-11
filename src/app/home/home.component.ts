import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AuthService } from '../shared/auth.service'

@Component({
    selector: 'beta-app-home',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent {
    private authService = inject(AuthService)

    logout() {
        this.authService.logout()
    }
}
