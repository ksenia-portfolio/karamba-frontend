import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../common/product';
import {map} from 'rxjs/operators';
import {Category} from '../common/category';

class GetResponse {
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/products';
  private categoryUrl = 'http://localhost:8080/category';

  constructor(private httpClient: HttpClient) { }
  getProductList(theCategoryId: number): Observable<Product[]>{

    // build url based on category id
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProductCategories(): Observable<Category[]> {
    return this.httpClient.get<GetResponseCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.category)
    );
  }
}

interface GetResponseProducts{
  _embedded: {
    products: Product[];
  };
}
interface GetResponseCategory{
  _embedded: {
    category: Category[];
  };
}
