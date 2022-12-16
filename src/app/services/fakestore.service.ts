import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../models/cart.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class FakestoreService {

  private endpointUrl : string = 'https://fakestoreapi.com';

  constructor(private http: HttpClient) { }

  // Products data --------------------
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.endpointUrl+'/products');
  }

  // Cart data --------------------
  getCart(id: number) : Observable<Cart> {
    return this.http.get<Cart>(this.endpointUrl+`/carts/${id}`);
  }

  postCart(cart: Cart) : Observable<any> {
    return this.http.post(this.endpointUrl + '/carts', cart);
  }

}
