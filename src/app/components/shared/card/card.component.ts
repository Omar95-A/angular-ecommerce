import { Component, Inject, Injector, Input } from '@angular/core';
import { ICart, Products } from '../../../core/interfaces/Products'
import { CommonModule, SlicePipe } from '@angular/common';
import { UserDataService } from '../../../core/services/user-data.service';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { NotificationsService } from '../../../core/services/notifications.service';
import { PopularProductsPipe } from '../../../core/pipes/popular-products.pipe';
import { SearchProductPipe } from '../../../core/pipes/search-product.pipe';
import { CartDataService } from '../../../core/services/cart-data.service';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from '../../../core/apiRoot/baseUrl';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [SlicePipe,ButtonModule,RouterLink,PopularProductsPipe,SearchProductPipe,CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {

    @Input({required: true}) productCount!: Products[];

    @Input() productSearch: string ='';

  private _activatedRoute: any;

    // cartItemCountFromCard: number = 0;



    constructor(private _httpClinet: HttpClient, private _cartDataService: CartDataService,         
                private _notificationsService:NotificationsService) {}

    addToCart(p: string) {
      this._cartDataService.addToCart(p)
    }

    markAsAddedToCart(product: Products) {
      this._cartDataService.markAsAddedToCart(product)
    }
  
    markAsRemoveFromCart(product: Products) {
      this._cartDataService.markAsRemoveFromCart(product)
    }

    removeFromCart(p: Products) {
      this._cartDataService.removeFromCart(p);
    }


    // addToCart(productId: string, event: Event) {
    //   event.stopPropagation();
    //   const userId = sessionStorage.getItem('token') || '';
    //   this._userDataService.addProdToCart({userId,productId}).subscribe((next) => {

    //     this._notificationsService.showSuccess('Success','The product has been added to the shopping cart.')
    //     // console.log(this._userDataService.cartItemCount);
    //     const storeCart = localStorage.getItem('cartItem');
    //     const cartItem = storeCart ? JSON.parse(storeCart) : {};

    //     cartItem[next.productId] = true;
        
    //     // const cartNumOfLS = Object.keys(cartItem).length;
    //     // this._userDataService.cartItemCount.next(cartNumOfLS)

    //     this._userDataService.getCountCart(next).subscribe((next) => {
    //         this.cartItemCountFromCard = next.length
    //         this._userDataService.cartItemCount.next(this.cartItemCountFromCard)
    //     });

    //     localStorage.setItem('cartItem', JSON.stringify(cartItem));
    //   });
    // }

}
