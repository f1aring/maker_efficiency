import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class WorkOrderService {

  private apiUrl = 'http://localhost:3000/customer/seach';
  constructor(private http: HttpClient) { }

  // getWorkOrders() {
  //   return this.http.get(this.apiUrl);
  // }
  // getCustomrWorkeOrders() {
  //   return this.http.get(this.apiUrl,{ nid_no: "987654321",
  //   phone: "9876543210"});
  // }
}
