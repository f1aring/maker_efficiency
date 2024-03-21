import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-multi-step',
  templateUrl: './multi-step.component.html',
  styleUrl: './multi-step.component.css'
})
export class MultiStepComponent {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  current = 0; 
  status = true;
  constructor(private formBuilder: FormBuilder) {
    this.firstFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
    });

    this.secondFormGroup = this.formBuilder.group({
      address: ['', Validators.required],
      city: ['', Validators.required],
    });

    this.thirdFormGroup = this.formBuilder.group({
      profession: ['', Validators.required],
      experience: ['', Validators.required],
    });
  }
  nextStep(formData: any) {

    
    for (let key in formData) {
      console.log('status',this.status)
      const value =  formData[key] 
      formData[key] = {
        value: value,
        status: this.status,
        comment: '' 
      }
      if(!this.status) this.status = !this.status;
      console.log(formData)
    }
    
    this.current++;
  }
  addCross(event: Event) {
   event.preventDefault();
   this.status = !this.status;
  }
  submitForm(formData: any) {
    console.log(this.status)
    for (const key in formData) {
      const value =  formData[key] 
      formData[key] = {
        value: value,
        status: this.status,
        comment: '' 
      }
      if(!this.status) this.status = !this.status;
      console.log(formData)
    }
    if (this.firstFormGroup.valid && this.secondFormGroup.valid && this.thirdFormGroup.valid) {
      // console.log(this.firstFormGroup.value);
      // console.log(this.secondFormGroup.value);
      // console.log(this.thirdFormGroup.value);
  

    }
  }
}