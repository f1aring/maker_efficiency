import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  step = 1;
  applicationForm!: FormGroup;
  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.applicationForm = this.fb.group({
      firstName: this.fb.control("Mehedi", Validators.required),
      lastName: this.fb.control("Hasan", Validators.required),
      mobile: this.fb.control("01785519804", [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11),
      ]),
      nid: this.fb.control("5555995116", Validators.required),
      address: this.fb.control("Muradnagar,Cumilla"),
      email: this.fb.control("mehedisasm@gmail.com", [
        Validators.required,
        Validators.email,
      ]),
    });
  }
  nextStepControl() {
    this.step++;
  }
  prevStepControl() {
    this.step--;
  }
  onSubmit() {
    console.log(this.applicationForm.value);
    this.step++;
  }
}
