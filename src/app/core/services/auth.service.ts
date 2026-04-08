import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../apiRoot/baseUrl';
import { Ilogin, IRegister } from '../interfaces/iregister';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _httpClient: HttpClient) { }

  register(registerData: IRegister): Observable<any> {
    return this._httpClient.post('http://localhost:3000/users',registerData);
  }

  login(loginData: Ilogin): Observable<any> {
    return this._httpClient.post('http://localhost:3000/users',loginData);
  }

  authorized(): boolean {
      if(typeof window !== 'undefined' && sessionStorage.getItem('token') != null) {
          return true;
      } else return false
  }

  logout(): Observable<any> {
    return this._httpClient.post('http://localhost:3000/logout',{})
  }

}
