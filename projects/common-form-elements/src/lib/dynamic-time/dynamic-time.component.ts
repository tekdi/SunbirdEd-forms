import {Component, Input, OnInit, AfterViewInit, OnChanges, ViewChild, ElementRef,SimpleChanges} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FieldConfigAsyncValidation, CustomFormGroup, FieldConfigValidationType } from '../common-form-config';

@Component({
  selector: 'sb-dynamic-time',
  templateUrl: './dynamic-time.component.html',
  styleUrls: ['./dynamic-time.component.css']
})
export class DynamicTimeComponent implements OnInit {

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
  @ViewChild('validationTrigger', {static: false}) validationTrigger: ElementRef;

  constructor() { }
  today = new Date();

  nowTime: any = (('0' + (this.today.getHours() + 1))).slice(-2) + ":" + ('0' + this.today.getMinutes()).slice(-2) + ":" + ('0' + this.today.getSeconds()).slice(-2);

  ngOnInit() {
  }
  
  ngAfterViewInit(){
    console.log("ngAfterViewInit");
    if (this.asyncValidation && this.asyncValidation.asyncValidatorFactory && this.formControlRef) {
      if (this.formControlRef.asyncValidator) {
        return;
      }

      this.formControlRef.setAsyncValidators(this.asyncValidation.asyncValidatorFactory(
        this.asyncValidation.marker,
        this.validationTrigger.nativeElement
      ));
    }
  }

  onChangeTimer(value)
  {
    if(value)
    {
      var date = new Date();
      let [hours,minutes] = value.split(':');
   
      date.setHours(+hours); 
      date.setMinutes(minutes);
      var formattedTime = date.toTimeString();
     // console.log("TIME=",formattedTime);
    }
    console.log("TIME=",formattedTime);//Gmt
    this.formControlRef.markAsTouched();
    this.formControlRef.patchValue(value);
  }
}

