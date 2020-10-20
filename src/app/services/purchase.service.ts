import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Customer} from '../common/customer';
import {Purchase} from '../common/purchase';
import {Product} from '../common/product';
import {Category} from '../common/category';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  private baseUrl = 'http://localhost:8080/purchases';
  private customerUrl = 'http://localhost:8080/customers';

  constructor(private httpClient: HttpClient) {
  }

  // find purchase by id
  getPurchaseById(purchaseId: number): Observable<Purchase> {
    const searchUrl = `${this.baseUrl}/${purchaseId}`;
    return this.httpClient.get<Purchase>(searchUrl);
  }

  // find purchase by purchaseCode
  getPurchaseByPurchaseCode(purchaseCode: string): Observable<Purchase> {
    const searchUrl = `/search/findPurchaseByPurchaseCode?purchaseCode=${purchaseCode}`;
    return this.httpClient.get<Purchase>(searchUrl);
  }

  // find purchases by customerId
  getPurchasesByCustomerId(customerId: number): Observable<Purchase[]> {
    const searchUrl = `/search/findPurchasesByCustomerId?customerId=${customerId}`;
    return this.httpClient.get<GetResponsePurchases>(searchUrl).pipe(
      map(response => response._embedded.purchases)
    );
  }

  // get products by purchaseId
  getProductsByPurchaseId(purchaseId: number): Observable<Product[]> {
    const searchUrl = `/${purchaseId}/products`;
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

}

interface GetResponsePurchases {
  _embedded: {
    purchases: Purchase[];
  };
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  };
}

interface GetResponseCustomer {
  _embedded: {
    customer: Customer[];
  };
}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  };
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  };
}
