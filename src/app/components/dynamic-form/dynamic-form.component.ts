import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.css'
})
export class DynamicFormComponent implements OnInit {
  formValue: any = {};
  
  myForm!: FormGroup;
  secondFormGroup!: FormGroup;
  formCount = 0;
  currentStep = 1;
  
  controlNames = [['name', 'age'], ['day', 'height'], ['city', 'state'], ['country']]; // Grouped array of control names for multi-step
  numbers = [1,2, 3, 4]
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.myForm = this.fb.group({});
    this.addControls();
  }

  addControls() {
    for (let step of this.controlNames) {
      for (let control of step) {
        this.myForm.addControl(control, this.fb.control('', Validators.required));
      }
    }
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
            status: key in this.formValue ? this.formValue[key] : true
        };
    }
    console.log(result);
    }
  }


  addCross(event: Event, controlName: string) {
    if (this.formValue[controlName] !== undefined) {
        this.formValue[controlName] = !this.formValue[controlName];
    } else {
        this.formValue[controlName] = false; // Default to true if undefined
    }
    console.log('hi');
}
}