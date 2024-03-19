import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RoofFanEquipmentComponent } from './roof-fan-equipment.component'

describe('RoofFanEquipmentComponent', () => {
    let component: RoofFanEquipmentComponent
    let fixture: ComponentFixture<RoofFanEquipmentComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RoofFanEquipmentComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(RoofFanEquipmentComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
