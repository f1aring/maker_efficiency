import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../service/customer/customer.service';
import { WriteService } from '../../service/write/write-service.service';
import { forkJoin, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'read-write',
  templateUrl: './read-write.component.html',
  styleUrls: ['./read-write.component.css']
})
export class ReadWriteComponent {
  array_number: number[] = [];
  works: any[] = [];
  controlNames: any[] = [];
  loading: boolean = true;
  supportingValues: any[] = [];
  field_id: any[] = [];
  work_order_id = 4;
  assigned_to = 9;
  acc_id!: number;
  customer_id!: number;
  image_array: any[] = [];
  fieldsId: any[] = []; // Initialize fieldsId as an empty array
  customer_field_details!: any[];
  controlNameValue: any = {};

  constructor(private customerService: CustomerService, private writeService: WriteService) {
    // Initialize fieldsId as an empty array in the constructor
    this.fieldsId = [];
  }

  ngOnInit(): void {
    this.getWorks(this.assigned_to, this.work_order_id);
  }

  getWorks(id: number, orderId: number): void {
    this.loading = true;

    this.writeService.getValuesForAuthor(orderId, id)
      .pipe(
        tap((data: any) => {
          this.works = data;
          for (let i = 0; i < data.fieldValue.length; i++) {
            this.fieldsId[i] = data.fieldValue[i].id;
          }
          this.customerDetails(this.work_order_id);
          const field_details = data.fieldValue;
          this.customer_field_details = field_details
          field_details.forEach((work: any) => {
            this.controlNames.push(work.field_name);
            this.controlNameValue[work.field_name] = work.value;
          });
        })
      )
      .subscribe({
        complete: () => {
          this.loading = false;
        },
        error: (error: any) => {
          console.error('Error fetching works:', error);
          this.loading = false;
        }
      });
  }

  customerDetails(id: number): void {
    console.log('hi')
    this.writeService.customerDetails(id).subscribe({
      next: (data) => {
        console.log('trash', data)
        this.acc_id = data.acc_id;
        this.customer_id = data.customer_id;
        console.log('fieldsId', this.fieldsId)
        if (this.fieldsId) {
          this.fieldsId.forEach((field: any) => {
            this.writeService.FormFieldLocation(field, this.customer_id, this.acc_id).subscribe({
              next: (data) => {
                this.image_array.push(data);
              },
              error: (error) => {
                console.error('Error fetching field location:', error);
              }
            });
          });
          if (this.image_array.length) console.log('image array', this.image_array);
        }
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
