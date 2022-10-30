import {Component, OnInit, Input} from '@angular/core';
import {UntypedFormGroup} from '@angular/forms';
import {FieldInput} from '../field-interface';

@Component({
  selector: 'spa-dynamic-field',
  templateUrl: './dynamic-field.component.html',
  styleUrls: ['./dynamic-field.component.css']
})
export class DynamicFieldComponent implements OnInit {

// @ts-ignore
  @Input() field!: FieldInput;
  // @ts-ignore
  @Input() form!: UntypedFormGroup;
  // @ts-ignore
  @Input() operation!: string;
  // @ts-ignore
  @Input() submitted!: boolean;

  get isValid(): boolean {
    return this.form.controls[this.field.key].valid;
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
