import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationsService } from './notifications.service';
import { Products } from '../interfaces/Products';
import { apiUrl } from '../apiRoot/baseUrl';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryDataService {

  constructor(private _httpClinet: HttpClient, private _notificationsService: NotificationsService) { }

  getCategoryProducts(): Observable<any> {
    return this._httpClinet.get(`${apiUrl}/products`)
  }

  // getSpecifecCategoryProducts(typeCate: string): Observable<any> {
  //   return this._httpClinet.get(`${apiUrl}/products`,{params: {type:typeCate}})
  // }
  getSpecifecCategoryProducts(e: string): Observable<any> {
    // return this._httpClinet.get(`${apiUrl}/products?prodCategory=watch`)
    return this._httpClinet.get(`${apiUrl}/products`,{params: {prodCategory:e}})
  }

}
