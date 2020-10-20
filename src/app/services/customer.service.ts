import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Customer} from '../common/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseUrl = 'http://localhost:8080/customers';
  private purchaseUrl = 'http://localhost:8080/purchase';

  constructor(private httpClient: HttpClient) {
  }

  // find customer by id
  getCustomerById(customerId: number): Observable<Customer> {
    const searchUrl = `${this.baseUrl}/${customerId}`;
    return this.httpClient.get<Customer>(searchUrl);
  }

  // find customer by email
  getCustomerByEmail(customerEmail: string): Observable<Customer> {
    const searchUrl = `/search/findCustomerByEmail?email=${customerEmail}`;
    return this.httpClient.get<Customer>(searchUrl);
  }

}

