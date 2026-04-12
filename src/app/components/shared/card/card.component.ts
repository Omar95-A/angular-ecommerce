import { Component, Inject, Injector, Input } from '@angular/core';
import { Products } from '../../../core/interfaces/Products'
import { SlicePipe } from '@angular/common';
import { UserDataService } from '../../../core/services/user-data.service';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { NotificationsService } from '../../../core/services/notifications.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [SlicePipe,ButtonModule,RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {

    @Input({required: true}) productCount!: number;
    cartItemCountFromCard: number = 0;

    // myproducts!: Products[];
    products: Array<Products> | undefined;


    constructor(private _userDataService: UserDataService,private _notificationsService:NotificationsService) {}

    ngOnInit() {
      this.getProducts()
        // this.products = [  
        //     {
        //         prodImg: 'bamboo-watch.jpg',
        //         prodTitle: 'Bamboo Watch',
        //         prodDescretion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto cumque modi corrupti quas reiciendis fugit eum illum,',
        //         prodOldPrice: 20,
        //         prodPrice: 17,
        //         prodDec: 15,
        //         prodAva: 'off',
        //     },
        //     {
        //         prodImg: 'blue-t-shirt.jpg',
        //         prodTitle: 'Blue T-Shirt',
        //         prodDescretion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto cumque modi corrupti quas reiciendis fugit eum illum,',
        //         prodOldPrice: 10,
        //         prodPrice: 5,
        //         prodDec: 50,
        //         prodAva: 'On',
        //     },
        //     {
        //         prodImg: 'bamboo-watch.jpg',
        //         prodTitle: 'Bamboo Watch',
        //         prodDescretion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto cumque modi corrupti quas reiciendis fugit eum illum,',
        //         prodOldPrice: 20,
        //         prodPrice: 17,
        //         prodDec: 15,
        //         prodAva: 'off',
        //     },
        //     {
        //         prodImg: 'blue-t-shirt.jpg',
        //         prodTitle: 'Blue T-Shirt',
        //         prodDescretion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto cumque modi corrupti quas reiciendis fugit eum illum,',
        //         prodOldPrice: 10,
        //         prodPrice: 5,
        //         prodDec: 50,
        //         prodAva: 'On',
        //     },
        //     {
        //         prodImg: 'bamboo-watch.jpg',
        //         prodTitle: 'Bamboo Watch',
        //         prodDescretion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto cumque modi corrupti quas reiciendis fugit eum illum,',
        //         prodOldPrice: 20,
        //         prodPrice: 17,
        //         prodDec: 15,
        //         prodAva: 'off',
        //     },
        //     {
        //         prodImg: 'blue-t-shirt.jpg',
        //         prodTitle: 'Blue T-Shirt',
        //         prodDescretion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto cumque modi corrupti quas reiciendis fugit eum illum,',
        //         prodOldPrice: 10,
        //         prodPrice: 5,
        //         prodDec: 50,
        //         prodAva: 'On',
        //     },
        // ];

    }

    // getProducts() {
    //     this._userDataService.getProducts().subscribe((next) => this.products= next);
    // }

    getProducts() {
        const storeCart = localStorage.getItem('cartItem');
        const cartItem = storeCart ? JSON.parse(storeCart) : {};
        this._userDataService.getProducts().subscribe((response: Products[]) => {
          this.products= response.map((prod)=>{return {...prod,isAdded: cartItem[prod.prodId] || false}})
        });
    }

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
