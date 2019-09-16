import { Injectable } from '@angular/core';
import { Product } from './product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getProduct(): Observable<Product[]> {
    const url = `${this.apiUrl}/product`;
    return this.http.get<Product[]>(url);
  }

  deleteProductItem(id: number): Observable<Product> {
    const url = `${this.apiUrl}/product/${id}`
    return this.http.delete<Product>(url);
  }

  addProductItem(product: Product): Observable<Product> {
    const url = `${this.apiUrl}/product`;
    return this.http.post<Product>(url, product);
  }

  updateProductItem(id: number, product: Product): Observable<Product> {
    const url = `${this.apiUrl}/product/${id}`;
    return this.http.put<Product>(url, product);
  }
}