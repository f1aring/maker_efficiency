import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WriteService {

  constructor(private http: HttpClient) { }

  distribute_work_order(id: number, orderId: number) : Observable<any> {
    return this.http.get<any>('http://localhost:3000/distribute-work-order/employee/'+ id+'/'+orderId);

  }

  field_data_by_work_id(order_id: number, assigned_to: number) :Observable<any> {
    return this.http.get<any>('http://localhost:3000/field-data/fields/'+ order_id+'/'+assigned_to);
  }
  PostFieldData(order_id: number, field_id: number, value: string): Observable<any> {
    const body = { "field_id": field_id, "order_id": order_id, "value": value };
    console.log(body)
    return this.http.put<any>('http://localhost:3000/field-data/update', body);
  }

  customerDetails(work_order_id: number): Observable<any> {
    return this.http.get<any>('http://localhost:3000/main-work-order/view/'+ work_order_id);
  }

  FormFieldLocation(field_id: number, customer_id: number, acc_id: number): Observable<any> {
    return this.http.get<any>('http://localhost:3000/form/field/'+ field_id+'/'+customer_id+'/'+acc_id);	
  }

  getFormValues(order_id: number): Observable<any> {
    return this.http.get<any>('http://localhost:3000/field-data/field_values/'+ order_id);
  }

  getValuesForAuthor(work_order_id: number, assigned_to: number ): Observable<any> {
    return this.http.get<any>('http://localhost:3000/distribute-work-order/author/'+ work_order_id+'/'+assigned_to);
  }
}
