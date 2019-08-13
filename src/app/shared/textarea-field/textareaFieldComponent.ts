import { Component, Input, forwardRef, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MyMaskUtil } from '../directives/my-mask.util';

const INPUT_FIELD_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TextAreaFieldComponent),
  multi: true
};

@Component({
  selector: 'app-textarea-field',
  templateUrl: './textarea-field.component.html',
  styleUrls: ['./textarea-field.component.css'],
  providers: [INPUT_FIELD_VALUE_ACCESSOR]
})
export class TextAreaFieldComponent implements ControlValueAccessor {

  //public phoneMask01 = MyMaskUtil.PHONE_MASK_GENERATOR;

  @Input() classeCss;
  @Input() id: string;
  @Input() label: string;
  @Input() cols = '60';
  @Input() rows = '10';
  @Input() maxlength = '5000';
  @Input() control;
  @Input() isReadOnly = false;
  @Input() placeholder:string = '';
  @Input() Mask:any;
  @Input() classe:string = 'control-label'


  private innerValue: any;

  get value() {
    return this.innerValue;
  }

  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCb(v);
    }
  }

  onChangeCb: (_: any) => void = () => {};
  onTouchedCb: (_: any) => void = () => {};

  writeValue(v: any): void {
    this.value = v;
  }

  registerOnChange(fn: any): void {
    this.onChangeCb = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCb = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isReadOnly = isDisabled;
  }



}
