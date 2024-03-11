import { ComponentFixture, TestBed } from '@angular/core/testing'
import { EquipmentTypePageComponent } from './equipment-type-page.component'

describe('EquipmentTypeComponent', () => {
    let component: EquipmentTypePageComponent
    let fixture: ComponentFixture<EquipmentTypePageComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [EquipmentTypePageComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(EquipmentTypePageComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
