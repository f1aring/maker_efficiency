import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzModalService } from 'ng-zorro-antd/modal';
import { WriteService } from '../../service/write/write-service.service';
import { map, Observable } from 'rxjs';
import { SenderService } from '../../service/sender.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {
  size: NzButtonSize = 'small';
  formValue: any = {};
  obj: any = {};
  myForm!: FormGroup;
  secondFormGroup!: FormGroup;
  currentStep = 1;
  controlValue!: string;
  idx = 0;
  timeInterval!: Date;

  @Input() controlNameValue!: { [key: string]: string };
  @Input() array_number!: number[];
  @Input() controlNames!: string[][];
  @Input() supportingValues!: any;
  @Input() field_id!: any;
  @Input() work_order_id!: number;
  @Input() fieldsId!: any;
  @Input() customer_field_details!: any[];
  @ViewChild('inputField') inputField!: ElementRef;
  
  firstField: any;
  

  textInputChecked = false;
  controlName!: string;

  constructor(private fb: FormBuilder, private modalService: NzModalService, private writeService: WriteService, private sharedService: SenderService) {}


  ngOnInit() {
    this.timeInterval = new Date(Date.now());
    this.myForm = this.fb.group({});
    if (this.inputField) {
      setTimeout(() => {
        this.inputField.nativeElement.focus(); // Autofocus the input field with a slight delay
      }, 0);
    }
    this.addControls();
  }
  

  addControls() {
    // Reset the form to clear existing control values
    this.myForm.reset();
  
    // Add controls
    for (let step of this.controlNames) {
      for (let control of step) {
        this.myForm.addControl(control, this.fb.control(''));
      }
    }
  }
  
    

  addTextInputControl() {
    this.myForm.addControl('textInput', this.fb.control(''));
  }

  goToStep(step: number) {
    console.log(step - 2);
    this.timeInterval = new Date(Date.now());
    
    // Calculate fieldValue index
    const fieldValueIndex = step - 2;
    
    // Check if fieldValueIndex is within bounds
    // if (fieldValueIndex >= 0 && fieldValueIndex < this.fieldsId.length) {
    //   const fieldValue = this.fieldsId[fieldValueIndex];
    //   console.log('Field Value:', fieldValue);
    //   this.sharedService.setFieldValue(fieldValue);
  
      // Proceed with other logic
      let fieldname = this.controlValue;
      if (fieldname) {
        console.log('Nice', this.supportingValues[fieldValueIndex]);
        let work_order_id = this.supportingValues[fieldValueIndex].work_order_id;
        let field_id = this.supportingValues[fieldValueIndex].field_id;
        let fieldName = this.myForm.value[fieldname];
        this.postFormValue(fieldName, work_order_id, field_id);
      }
    
      this.currentStep = step;
      this.addControls(); // Reset the form controls
    // } else {
    //   console.error('Invalid fieldValueIndex:', fieldValueIndex);
    // }
  }
  
  postFormValue(value: string, work_order_id: number, field_id: number) {
    this.writeService.PostFieldData(work_order_id, field_id, value).subscribe();
    
  }
  // customerDetails(id: number){
  //   this.writeService.customerDetails(id).subscribe(data=>{
  //     console.log('customer details', data)
  //   });
  // }
  // customerDetails(id: number): Observable<any> {
    
  //   return this.writeService.customerDetails(id).pipe(
  //     map(data => {
  //       console.log('customer details', data);
  //       return data; // You may return data if needed
  //     })
  //   );
  // }

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
      
    }
  }

  addCross(event: Event, controlName: string) {
    if (this.formValue[controlName] !== undefined) {
      this.formValue[controlName] = !this.formValue[controlName];
    } else {
      this.formValue[controlName] = false;
    }
  }

  addComment() {}

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

  submitModalValues(event: Event, controlName: string) {
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

  logInputName(inputName: string) {
    this.controlValue = inputName;
    console.log('exp 1',this.controlValue);
    console.log('exp 2', this.customer_field_details)
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
