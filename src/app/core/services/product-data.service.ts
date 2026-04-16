import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationsService } from './notifications.service';
import { Products } from '../interfaces/Products';
import { Observable } from 'rxjs';
import { apiUrl } from '../apiRoot/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {

  constructor(private _httpClinet: HttpClient, private _notificationsService: NotificationsService) { }

  homeProducts: Products[]=[];

  getAllProducts(): Observable<any> {
    return this._httpClinet.get(`${apiUrl}/products`)
  }


  getProducts() {
      const storeCart = localStorage.getItem('cartItem');
      const cartItem = storeCart ? JSON.parse(storeCart) : {};
      this.getAllProducts().subscribe((response: Products[]) => {
        this.homeProducts= response.map((prod)=>{return {...prod,isAdded: cartItem[prod.prodId] || false}});
      });
  }

  getDetails(id: string): Observable<any> {
    return this._httpClinet.get(`${apiUrl}/products`,{params: {id:id}})
    // return this._httpClinet.get(`${apiUrl}/products?prodId=1000`)
    // return this._httpClinet.get(`${apiUrl}/products/${id}`)
  }


}
