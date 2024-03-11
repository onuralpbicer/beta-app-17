import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AuthService } from '../shared/auth.service'

@Component({
    selector: 'beta-app-home-page',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
    private authService = inject(AuthService)

    logout() {
        this.authService.logout()
    }
}
