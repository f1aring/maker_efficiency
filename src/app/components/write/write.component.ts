import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../service/customer/customer.service';
import { WriteService } from '../../service/write/write-service.service';
import { forkJoin, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.css'] // Corrected styleUrl to styleUrls
})
export class WriteComponent implements OnInit {
  array_number: number[] = [];
  works: any[] = [];
  controlNames: any[] = [];
  loading: boolean = true;
  supportingValues: any[] = []
  field_id: any[] = []
  work_order_id = 5;
  assigned_to = 7;
  acc_id!: number;
  customer_id!: number;
  image_array: any[] = [];
  fieldsId!: any[];
  customer_field_details!: any[];

  constructor(private customerService: CustomerService, private writeService: WriteService) { }

  ngOnInit(): void {
    this.getWorks(this.assigned_to, this.work_order_id);
    console.log('ref 4', this.image_array);
    // this.customerDetails(this.work_order_id);
  }

  getWorks(id: number, orderId: number): void {
    
    this.loading = true; // Set loading to true when fetching works
    this.writeService.distribute_work_order(id, orderId).subscribe((data) => {
      this.works = data;
      
      const values = this.works.map(work => {
        
        this.field_id = work.field_id;
        
        for(let i = 0; i< work.field_id.length; i++){
            let obj = {
              'field_id': work.field_id[i],
              'work_order_id': work.work_order_id
            }
            this.supportingValues.push(obj);
        }
      });
      // console.log(this.supportingValues);
      const requests = this.works.map(work => this.getFields(work.work_order_id, work.assigned_to));
     
      forkJoin(requests).subscribe(() => {
        
        this.createArray(this.controlNames.length);
        this.loading = false; // Set loading to false when all data is fetched
      });
    });
 
  }
  

  getFields(order_id: number, assigned_to: number): Observable<void> {
    return this.writeService.field_data_by_work_id(order_id, assigned_to).pipe(
      tap((data: any) => {
        this.customer_field_details = data;
        this.fieldsId = data.map((field: any) => field.id);

        console.log('ref 5',this.fieldsId);
        //Take this to dynamic component
        if(this.fieldsId)     this.customerDetails(this.work_order_id);
        const fields = data.map((field: any) => field.field_name);
        
        fields.forEach((field: any) => {
          this.controlNames.push([field]); // Push each field into its own array
        });
      }),
      catchError(error => {
        console.error('Error fetching fields:', error);
        return throwError(error);
      })
    );
  }
  customerDetails(id: number): void {
    
    this.writeService.customerDetails(id).subscribe({
      next: (data) => {
        this.acc_id = data.acc_id;
        this.customer_id = data.customer_id;
        // console.log(this.acc_id, this.customer_id);
        console.log('fieldsId',this.fieldsId);
        if(this.fieldsId) {
          this.fieldsId.forEach((field: any) => {
            // console.log(field);
            this.writeService.FormFieldLocation(field, this.customer_id, this.acc_id).subscribe({
              next: (data) => { 
                
                this.image_array.push(data) ;
                // console.log(this.image_array);
              },
              error: (error) => {
                console.error('Error fetching field location:', error);
              }
            });
          });
          if(this.image_array.length) console.log('image array', this.image_array); 
        }
       //ima
      },
      error: (error) => {
        console.error('Error fetching customer details:', error);
      }
    });
   
  }
  

  createArray(input: number): void {
    for (let i = 1; i <= input + 1; i++) {
      this.array_number.push(i);
    }
  }
}
