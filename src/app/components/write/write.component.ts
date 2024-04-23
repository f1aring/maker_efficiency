// write.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.css']
})
export class WriteComponent {
  listOfField = ['name', 'age', 'weight', 'height'];
  formData: { [key: string]: string } = {}; // Initialize an empty object

  // You can handle form submission here if needed
  onSubmit() {
    console.log('Form data:', this.formData);
    // Add your logic to handle the form data (e.g., send it to a server)
  }
}
