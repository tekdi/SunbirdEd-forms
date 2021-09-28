import {Component, Input, OnInit, AfterViewInit, OnChanges, ViewChild, ElementRef} from '@angular/core';
import {FormControl} from '@angular/forms';
import { FieldConfigAsyncValidation } from '../common-form-config';
import { DatePipe } from '@angular/common';
import { tap } from 'rxjs/operators';
import { Subscription } from 'rxjs/internal/Subscription';
import * as moment_ from 'moment';

@Component({
  selector: 'sb-dynamic-date',
  templateUrl: './dynamic-date.component.html',
  styleUrls: ['./dynamic-date.component.css']
})
export class DynamicDateComponent implements OnInit {
  @Input() asyncValidation?: FieldConfigAsyncValidation;
  @Input() label: String;
  @Input() labelHtml: any;
  @Input() placeholder: String;
  @Input() validations?: any;
  @Input() formControlRef?: FormControl;
  @Input() prefix?: String;
  @Input() default: String;
  @Input() field?: any;
  @Input() disabled: Boolean;
  @ViewChild('validationTrigger') validationTrigger: ElementRef;
  valueChangesSubscription: Subscription;
  constructor() {
  }
  today = new Date();
  todayDate = this.today.getFullYear() + '-' + ('0' + (this.today.getMonth() + 1)).slice(-2) + '-' + ('0' + this.today.getDate()).slice(-2);

  ngOnInit() {
    let result = this.validations.find(data => data.type==='dateFormat');
    let date = moment_(this.field.default,result.value).format("YYYY-MM-DD")
    this.formControlRef.setValue(date);
  }

  ngAfterViewInit() {
    if (this.asyncValidation && this.asyncValidation.asyncValidatorFactory && this.formControlRef) {
      if (this.formControlRef.asyncValidator) {
        return;
      }

      this.formControlRef.setAsyncValidators(this.asyncValidation.asyncValidatorFactory(
        this.asyncValidation.marker,
        this.validationTrigger.nativeElement
      ));
      console.log(this.formControlRef);
    }
  }
}

