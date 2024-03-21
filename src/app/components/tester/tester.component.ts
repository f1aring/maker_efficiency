import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-tester',
  templateUrl: './tester.component.html',
  styleUrl: './tester.component.css'
})
export class TesterComponent {
  form!: FormGroup;
  currentStep: number = 1;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      step1Field: ['', Validators.required],
      step2Field: ['', Validators.required],
      step3Field: ['', Validators.required]
    });
  }

  nextStep() {
    this.currentStep++;
  }

  prevStep() {
    this.currentStep--;
  }

  clearField(fieldName: string) {
    this.form.get(fieldName)!.setValue('');
  }

  submit() {
    // Handle form submission
    console.log(this.form.value);
  }
}
