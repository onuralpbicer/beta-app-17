import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TripleSelectorComponent } from './triple-selector.component'

describe('TripleSelectorComponent', () => {
    let component: TripleSelectorComponent
    let fixture: ComponentFixture<TripleSelectorComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TripleSelectorComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(TripleSelectorComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
