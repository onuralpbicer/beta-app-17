import { ComponentFixture, TestBed } from '@angular/core/testing'
import { NewPasswordPageComponent } from './new-password-page.component'

describe('NewPasswordComponent', () => {
    let component: NewPasswordPageComponent
    let fixture: ComponentFixture<NewPasswordPageComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NewPasswordPageComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(NewPasswordPageComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
