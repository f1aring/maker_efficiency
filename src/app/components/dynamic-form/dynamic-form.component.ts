import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.css'
})
export class DynamicFormComponent implements OnInit {
  formCount = 0;
  currentStep = 1;
  myForm!: FormGroup;
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
      console.log('Form values:', this.myForm.value);
      this.formCount++;
      if (this.currentStep < this.controlNames.length) {
        this.goToStep(this.currentStep + 1); // Go to the next step
      } else {
        // Form is complete, handle final submission here
      }
    }
  }
}