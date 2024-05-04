import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzModalService } from 'ng-zorro-antd/modal';
import { WriteService } from '../../service/write/write-service.service';
import { map, Observable } from 'rxjs';
import { SenderService } from '../../service/sender.service';

@Component({
  selector: 'app-read-write-dynamic',
  templateUrl: './read-write-dynamic.component.html',
  styleUrl: './read-write-dynamic.component.css'
})
export class ReadWriteDynamicComponent implements OnInit {
  size: NzButtonSize = 'small';
  formValue: any = {};
  obj: any = {};
  myForm!: FormGroup;
  secondFormGroup!: FormGroup;
  formCount = 0;
  currentStep = 1;
  controlValue!: string;
  // controlNames = [['name', 'age'], ['day', 'height'], ['city', 'state'], ['country']];
  @Input() controlNameValue!: { [key: string]: string };
  @Input() array_number!: number[];
  @Input() controlNames!: any;
  @Input() customer_field_details!: any[];
  
  textInputChecked = false;
  controlName!: string;

  constructor(private fb: FormBuilder, private modalService: NzModalService, private writeService: WriteService, private sharedService: SenderService) {}

  ngOnInit() {
    this.array_number = [1];
    this.controlNames = [this.controlNames]
    console.log(this.controlNames)

    console.log(this.controlNameValue)
    this.myForm = this.fb.group({});
    this.addControls();
    this.addTextInputControl(); // Add text input control
    console.log(this.array_number)
    // Set default values for form controls
    this.setDefaultValues();
  }
  
  setDefaultValues() {
    // Assuming controlNameValue contains the default values
    if (this.controlNameValue) {
      this.myForm.patchValue(this.controlNameValue);
    }
  }

  addControls() {
    for (let step of this.controlNames) {
      for (let control of step) {
        this.myForm.addControl(control, this.fb.control('', Validators.required));
      }
    }
  }

  addTextInputControl() {
    this.myForm.addControl('textInput', this.fb.control(''));
  }
  goToStep(step: number) {
    this.currentStep = step;
  }
  onSubmit() {
    if (this.myForm.valid) {
      let result: any = {};
      for (let key in this.myForm.value) {
        result[key] = {
          value: this.myForm.value[key],
          status: key in this.formValue ? this.formValue[key] : true,
          comments: key in this.obj ? this.obj[key] : []
        };
      }
      console.log(result);
    }
  }

  addCross(event: Event, controlName: string) {
    if (this.formValue[controlName] !== undefined) {
      this.formValue[controlName] = !this.formValue[controlName];
    } else {
      this.formValue[controlName] = false;
    }
  }

  addComment(){
    
  }

  isVisible = false;
  isConfirmLoading = false;

  showModal1(): void {
    this.isVisible = true;
  }

  showModal2(): void {
    this.modalService.create({
      nzTitle: 'Modal Title',
    });
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  submitModalValues(event: Event, controlName: string) { //change here
    // Logging the checked values
    
    const checkedValues: string[] = [];
    const checkboxes = document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        checkedValues.push(checkbox.value);
      }
    });
    // Logging the value of the text input
    const textInputValue = this.myForm.get('textInput')!.value;
    checkedValues.push(textInputValue)
    this.obj[controlName] = checkedValues;
   
    this.isVisible = false;
    
  }
  // logInputName(inputName: string) {
  //   console.log("Input name:", inputName);
  // }
  logInputName(inputName: string) {
    this.controlValue = inputName;
    for (let i = 0; i < this.customer_field_details.length; i++) {
      if (this.customer_field_details[i].field_name === inputName) {
        console.log(this.customer_field_details[i].id);
        this.sharedService.setFieldValue(this.customer_field_details[i].id);
      }
    }
  }
  
  logValuesAndComments(controlName: string) {
    
    const control = this.myForm.get(controlName);
    console.log(controlName)
    if (control && control.valid) {
      
      const result: any = {};
      result[controlName] = {
        value: control.value,
        status: controlName in this.formValue ? this.formValue[controlName] : true,
        comments: controlName in this.obj ? this.obj[controlName] : []
      };
      console.log(result);
    }
  }
}
