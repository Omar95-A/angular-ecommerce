import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationsService } from './notifications.service';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { apiUrl } from '../apiRoot/baseUrl';
import { ICart, Products } from '../interfaces/Products';

@Injectable({
  providedIn: 'root'
})
export class CartDataService {

  constructor(private _httpClinet: HttpClient, private _notificationsService: NotificationsService) { }

  cartItemCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  cartItemCountFromCard: number = 0;

  getCountCart(id: string): Observable<any> {
    return this._httpClinet.get(`${apiUrl}/cart`)
  }

  addProdToCart(userData: {prodId: string, userId: string}): Observable<any> {
    return this._httpClinet.post(`${apiUrl}/cart`,userData)
  }

  addToCart(prodId: string) {
    const userId = sessionStorage.getItem('token') || '';
    const storeCart = localStorage.getItem('cartItem') || '';
    const exists = storeCart.slice(1,-1).split(',').some(item => item.includes(prodId));
    if (exists) {
      console.log('This product already in cart!!');
       return;
    }
    this.addProdToCart({prodId,userId}).subscribe((next) => {
    this._notificationsService.showSuccess('Success','The product has been added to the shopping cart.')
    const cartItem = storeCart ? JSON.parse(storeCart) : {};
    // cartItem[next.prodId] = true;
    cartItem[next.prodId] = next.id;

      // const cartNumOfLS = Object.keys(cartItem).length;
      // this._userDataService.cartItemCount.next(cartNumOfLS)

      this.getCountCart(next).subscribe((next) => {
          this.cartItemCountFromCard = next.length
          this.cartItemCount.next(this.cartItemCountFromCard)
      });

      localStorage.setItem('cartItem', JSON.stringify(cartItem));
    });
  }

  markAsAddedToCart(product: Products) {
    this._httpClinet.patch(`${apiUrl}/products/${product.id}`, {
      isAdded: true
    }).subscribe(() => {
      // this._notificationsService.showSuccess('Success','The product has been added to the shopping cart.')
      product.isAdded = true;
    });
  }

  markAsRemoveFromCart(product: Products) {
    this._httpClinet.patch(`${apiUrl}/products/${product.id}`, {
      isAdded: false
    }).subscribe(() => {
      this._notificationsService.showSuccess('Success','The product has been removed from the shopping cart.')
      product.isAdded = false;
    });
  }

  removeFromCart(product: Products) {
    const storeCart = localStorage.getItem('cartItem') || '';
    const obj = JSON.parse(storeCart);

    this._httpClinet.delete(`${apiUrl}/cart/${obj[product.id]}`)
      .subscribe(() => {
        console.log('Deleted Successfully');
        this.getCountCart('').subscribe((next) => {
            this.cartItemCountFromCard = next.length
            this.cartItemCount.next(this.cartItemCountFromCard)
        });
      });

    delete obj[product.id];
    localStorage.setItem('cartItem', JSON.stringify(obj));
  }


  // getCartItems(): Observable<any> {
  //   return this._httpClinet.get(`${apiUrl}/cart`)
  // }

  // getCartItem(product: Products) {
  //   const storeCart = localStorage.getItem('cartItem') || '';
  //   const obj = JSON.parse(storeCart);

  //   // this.getCartItems().subscribe((nexr) => {nexr.prodId == product.id})

  //   this._httpClinet.get(`${apiUrl}/products`)
  //     .subscribe(() => {
  //       console.log('obj',obj)
  //       console.log('Deleted Successfully');
  //       this.getCountCart('').subscribe((next) => {
  //           this.cartItemCountFromCard = next.length
  //           this.cartItemCount.next(this.cartItemCountFromCard)
  //       });
  //     });

  //   delete obj[product.id];
  //   localStorage.setItem('cartItem', JSON.stringify(obj));
  // }

}
