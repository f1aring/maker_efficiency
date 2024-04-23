import { Component, OnInit,  Input  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzModalService } from 'ng-zorro-antd/modal';

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
  formCount = 0;
  currentStep = 1;
  // controlNames = [['name', 'age'], ['day', 'height'], ['city', 'state'], ['country']];
  @Input() controlNameValue!: { [key: string]: string };
  @Input() array_number!: number[];
  @Input() controlNames!: string[][];
  
  textInputChecked = false;
  controlName!: string;

  constructor(private fb: FormBuilder, private modalService: NzModalService) {}

  ngOnInit() {
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
  logInputName(inputName: string) {
    console.log("Input name:", inputName);
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
