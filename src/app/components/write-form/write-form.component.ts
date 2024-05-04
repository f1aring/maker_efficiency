import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-write-form',
  templateUrl: './write-form.component.html',
  styleUrl: './write-form.component.css'
})
export class WriteFormComponent {
  step1Form: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.step1Form = this.formBuilder.group({
      // Define your form controls with validators if needed
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  goToNextStep() {
    if (this.step1Form.valid) {
      // Save form data and navigate to the next step
      this.router.navigate(['/step2']);
    }
  }
}
