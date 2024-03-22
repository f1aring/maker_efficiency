import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tester',
  templateUrl: './tester.component.html',
  styleUrls: ['./tester.component.css']
})
export class TesterComponent implements OnInit {
  formValue: any = {};
  formValue2: any = {};
  myForm!: FormGroup;
  secondFormGroup!: FormGroup;
  current = 0; 
  constructor(private fb: FormBuilder) {}


  nextStep() {    
    this.current++;
  }
  ngOnInit(): void {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
    });
    this.secondFormGroup = this.fb.group({
      address: ['', Validators.required],
      city: ['', Validators.required],
    });

    // Initialize formValue with transformed form values
    this.formValue = this.transformFormValue(this.myForm.value);
    this.formValue2 = this.transformFormValue(this.secondFormGroup.value);
  }

  onSubmit() {
    if (this.myForm.valid || this.secondFormGroup.valid) {
      console.log(this.formValue);
      console.log(this.formValue2);
    }
    this.current++;
  }

  transformFormValue(formValue: any): any {
    const transformedFormValue: any = {};
    for (const controlName of Object.keys(formValue)) {
      transformedFormValue[controlName] = {
        value: formValue[controlName],
        status: true
      };
    }
    return transformedFormValue;
  }

  addCross(event: Event, controlName: string) {
    event.preventDefault();
    if (this.formValue && this.formValue[controlName]) {
      this.formValue[controlName].status = !this.formValue[controlName].status;
      console.log(this.formValue);
    }
  }
}
