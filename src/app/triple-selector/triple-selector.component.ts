import { Component, Input, forwardRef } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SegmentCustomEvent, SegmentValue } from '@ionic/angular'
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms'
import {
    IonIcon,
    IonSegment,
    IonSegmentButton,
} from '@ionic/angular/standalone'
import { addIcons } from 'ionicons'
import { checkmarkOutline, removeOutline, closeOutline } from 'ionicons/icons'

addIcons({
    checkmarkOutline,
    removeOutline,
    closeOutline,
})

@Component({
    selector: 'beta-app-triple-selector',
    standalone: true,
    imports: [
        CommonModule,
        IonSegment,
        IonSegmentButton,
        IonIcon,
        ReactiveFormsModule,
    ],
    templateUrl: './triple-selector.component.html',
    styleUrl: './triple-selector.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TripleSelectorComponent),
            multi: true,
        },
    ],
})
export class TripleSelectorComponent {
    @Input() readonly = false

    public value: SegmentValue | null = null
    public disabled = false

    handleChange(_event: Event) {
        const event = _event as SegmentCustomEvent
        this.value = event.detail.value ?? null
        this.onChanged(event.detail.value ?? null)
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    public onChanged(_value: SegmentValue | null) {}

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public onTouched() {}

    // eslint-disable-next-line @typescript-eslint/ban-types
    registerOnChange(fn: (value: SegmentValue | null) => {}): void {
        this.onChanged = fn
    }

    // eslint-disable-next-line @typescript-eslint/ban-types
    registerOnTouched(fn: () => {}): void {
        this.onTouched = fn
    }

    writeValue(value: SegmentValue | null): void {
        this.value = value
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled
    }
}
