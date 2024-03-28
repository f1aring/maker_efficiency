import { Component } from '@angular/core';
import { CustomerService } from './service/customer/customer.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'maker-efficiency';
  constructor(private customerService: CustomerService) {
  }
  
  ngOnInit(): void {
    
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log('hello')
    this.customerService.searchCustomer("987654321", "9876543210").subscribe((data) => {
      console.log(data)
    });
  }
  
  controlNames = [['name', 'age'], ['day', 'height'], ['city', 'state'], ['country']];
}
