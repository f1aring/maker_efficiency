import { Component } from '@angular/core';
import { CustomerService } from '../../service/customer/customer.service';
@Component({
  selector: 'app-checker',
  templateUrl: './checker.component.html',
  styleUrl: './checker.component.css'
})
export class CheckerComponent {
  array_number: number[] = [];
  constructor(private customerService: CustomerService) {
  }
  
  ngOnInit(): void {
    
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.createArray(Object.keys(this.controlNames).length);
    console.log(this.array_number)
    // this.customerService.searchCustomer("987654321", "9876543210").subscribe((data) => {
    //   console.log(data)
    // });
  }
  controlNameValue = {name: 'Arman', age: '25', day : '7', height: '180', city: 'Dhaka', state: 'Dhaka', country: 'Bangladesh'};		
  controlNames = [['name'], ['city'], ['country']];
 


createArray(input : number){
    for (let i = 1; i <= input + 1; i++) {
      this.array_number.push(i);
    }
  }

}
