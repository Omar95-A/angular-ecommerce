import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Products } from '../interfaces/Products';
import { apiUrl } from '../apiRoot/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private _httpClinet: HttpClient) { }
  userName: BehaviorSubject<string> = new BehaviorSubject<string>('User');

  cartItemCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  getCountCart(id: string): Observable<any> {
    return this._httpClinet.get(`${apiUrl}/cart`)
  }

  addToCart(userData: {productId: string, userId: string}): Observable<any> {
    return this._httpClinet.post(`${apiUrl}/cart`,userData)
  }

  getProducts(): Observable<any> {
    return this._httpClinet.get(`${apiUrl}/products`)
  }

}
