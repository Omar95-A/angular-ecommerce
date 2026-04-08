import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private _httpClinet: HttpClient) { }
  userName: BehaviorSubject<string> = new BehaviorSubject<string>('User');

  getCountCart(id: string): Observable<any> {
    return this._httpClinet.get('http://localhost:3000/cart')
  }
}
