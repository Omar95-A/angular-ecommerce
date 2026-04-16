import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Products } from '../interfaces/Products';
import { apiUrl } from '../apiRoot/baseUrl';
import { NotificationsService } from './notifications.service';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private _httpClinet: HttpClient, private _notificationsService: NotificationsService) { }

  userName: BehaviorSubject<string> = new BehaviorSubject<string>('User');



  // homeProducts: Products[]=[];

  // getAllProducts(): Observable<any> {
  //   return this._httpClinet.get(`${apiUrl}/products`)
  // }

  // getProducts() {
  //     const storeCart = localStorage.getItem('cartItem');
  //     const cartItem = storeCart ? JSON.parse(storeCart) : {};
  //     this.getAllProducts().subscribe((response: Products[]) => {
  //       this.homeProducts= response.map((prod)=>{return {...prod,isAdded: cartItem[prod.prodId] || false}});
  //     });
  // }

  // getCategoryProducts(): Observable<any> {
  //   return this._httpClinet.get(`${apiUrl}/products`)
  // }

  // // getSpecifecCategoryProducts(typeCate: string): Observable<any> {
  // //   return this._httpClinet.get(`${apiUrl}/products`,{params: {type:typeCate}})
  // // }
  // getSpecifecCategoryProducts(e: string): Observable<any> {
  //   // return this._httpClinet.get(`${apiUrl}/products?prodCategory=watch`)
  //   return this._httpClinet.get(`${apiUrl}/products`,{params: {prodCategory:e}})
  // }

  // getDetails(id: string): Observable<any> {
  //   return this._httpClinet.get(`${apiUrl}/products`,{params: {_id:id}})
  //   // return this._httpClinet.get(`${apiUrl}/products?prodId=1000`)
  //   // return this._httpClinet.get(`${apiUrl}/products/${id}`)
  // }

  // *** Cart Processes ***
  // cartItemCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  // cartItemCountFromCard: number = 0;

  // getCountCart(id: string): Observable<any> {
  //   return this._httpClinet.get(`${apiUrl}/cart`)
  // }

  // addProdToCart(userData: {productId: string, userId: string}): Observable<any> {
  //   return this._httpClinet.post(`${apiUrl}/cart`,userData)
  // }

  // addToCart(productId: string) {
  //   const userId = sessionStorage.getItem('token') || '';
  //   this.addProdToCart({userId,productId}).subscribe((next) => {
  //     this._notificationsService.showSuccess('Success','The product has been added to the shopping cart.')
  //     // console.log(this._userDataService.cartItemCount);
  //     const storeCart = localStorage.getItem('cartItem');
  //     const cartItem = storeCart ? JSON.parse(storeCart) : {};

  //     cartItem[next.productId] = true;
        
  //     // const cartNumOfLS = Object.keys(cartItem).length;
  //     // this._userDataService.cartItemCount.next(cartNumOfLS)

  //     this.getCountCart(next).subscribe((next) => {
  //         this.cartItemCountFromCard = next.length
  //         this.cartItemCount.next(this.cartItemCountFromCard)
  //     });

  //     localStorage.setItem('cartItem', JSON.stringify(cartItem));
  //   });
  // }

}
