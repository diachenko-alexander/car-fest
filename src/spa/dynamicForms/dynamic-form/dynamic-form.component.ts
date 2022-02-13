import {Component, OnInit, EventEmitter, Input, OnChanges, SimpleChange, Output, SimpleChanges} from '@angular/core';
import {Location} from '@angular/common';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {FieldInput} from '../field-interface';

@Component({
  selector: 'spa-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit, OnChanges {
  @Input()
  vm: any;
  // @ts-ignore
  @Input()
  vmDefinition: Array<FieldInput>;
  // @ts-ignore
  @Input()
  operation: string;
  // @ts-ignore
  @Input()
  errorMessage: string;
  @Output()
  update: EventEmitter<any> = new EventEmitter();
  @Output()
  create: EventEmitter<any> = new EventEmitter();

  // @ts-ignore
  form: FormGroup;
  // @ts-ignore
  status: string;
  submitted = false;
  vmCopy: any;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public location: Location
  ) {
  }

  clearForm(): void {
    const group = {};
    this.vmCopy = Object.assign({}, this.vm);
    this.vmDefinition.forEach((field => {
      // @ts-ignore
      group[field.key] = field.required ?
        new FormControl(this.vmCopy[field.key], Validators.required) :
        new FormControl(this.vmCopy[field.key]);
    }));
    this.form = new FormGroup(group);
  }

  ngOnInit(): void {
    this.clearForm();
    this.route.params.subscribe(params => {
      this.operation = params.operation;
      this.clearForm();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.errorMessage.currentValue && this.status === 'waiting') {
      this.status = '';
    }
  }

  onBack(): void {
    // @ts-ignore
    this.errorMessage = null;
    this.location.back();
  }

  onEdit(): void {
    this.router.navigate(['../', 'edit'], {relativeTo: this.route});
  }

  onCancel(): void {
    this.onBack();
  }

  onSave(): void {
    this.submitted = true;
    if (this.form.valid) {
      this.status = 'waiting';
      this.update.emit(this.form.value);
    }
  }

  onCreate(): void {
    this.submitted = true;
    if (this.form.valid) {
      this.status = 'waiting';
      this.create.emit(this.form.value);
    }
  }

  onSubmit(): void {

  }
}
