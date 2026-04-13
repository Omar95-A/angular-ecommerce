import { Component, Inject, Injector, Input } from '@angular/core';
import { Products } from '../../../core/interfaces/Products'
import { SlicePipe } from '@angular/common';
import { UserDataService } from '../../../core/services/user-data.service';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { NotificationsService } from '../../../core/services/notifications.service';
import { PopularProductsPipe } from '../../../core/pipes/popular-products.pipe';
import { SearchProductPipe } from '../../../core/pipes/search-product.pipe';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [SlicePipe,ButtonModule,RouterLink,PopularProductsPipe,SearchProductPipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {

    @Input({required: true}) productCount!: Products[];
    cartItemCountFromCard: number = 0;

    constructor(private _userDataService: UserDataService,private _notificationsService:NotificationsService) {}

    addToCart(productId: string) {
      const userId = sessionStorage.getItem('token') || '';
      this._userDataService.addToCart({userId,productId}).subscribe((next) => {

        this._notificationsService.showSuccess('Success','The product has been added to the shopping cart.')
        // console.log(this._userDataService.cartItemCount);
        const storeCart = localStorage.getItem('cartItem');
        const cartItem = storeCart ? JSON.parse(storeCart) : {};

        cartItem[next.productId] = true;
        
        // const cartNumOfLS = Object.keys(cartItem).length;
        // this._userDataService.cartItemCount.next(cartNumOfLS)

        this._userDataService.getCountCart(next).subscribe((next) => {
            this.cartItemCountFromCard = next.length
            this._userDataService.cartItemCount.next(this.cartItemCountFromCard)
        });

        localStorage.setItem('cartItem', JSON.stringify(cartItem));
      });
    }


}
