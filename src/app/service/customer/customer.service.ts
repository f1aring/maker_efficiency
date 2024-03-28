import { Injectable } from '@angular/core';
import { HttpClient, HttpParams,  } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'http://localhost:3000/customer/search';
  constructor(private http: HttpClient) { }

  searchCustomer(nid_no: string, phone: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('nid_no', nid_no);
    params = params.append('phone', phone);
    const body: {
      nid_no: string;
      phone: string;
  } = {
      "nid_no": nid_no,
      "phone": phone
    }
    
    
    return this.http.get<any>(this.apiUrl+`/${nid_no}/${phone}`);
  }
}
