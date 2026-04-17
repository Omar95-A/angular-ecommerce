import { Component } from '@angular/core';
import { CategoryDataService } from '../../core/services/category-data.service';
import { CartDataService } from '../../core/services/cart-data.service';
import { Products } from '../../core/interfaces/Products';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductDataService } from '../../core/services/product-data.service';
import { ButtonModule } from 'primeng/button';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from '../../core/apiRoot/baseUrl';



import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink,ButtonModule,DataViewModule, ButtonModule, TagModule, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

  cateProduct: Products[] = []
  
  constructor(private _cartDataService: CartDataService, 
              private _httpClinet: HttpClient,
              private _productDataService: ProductDataService) {}

  ngOnInit() {
    const userId = sessionStorage.getItem('token') || '';
    this.loadCartProducts(userId);
  }


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
    const userId = sessionStorage.getItem('token') || '';
    this.loadCartProducts(userId);
  }



// isInCart(productId: string, cart: any[]): boolean {
//   return cart.some(item => item.prodId === productId);
// }

  cart: any[] = [];
  products: any[] = [];
  cartProducts: any[] = [];

  loadCartProducts(userId: string) {

    this._httpClinet.get<any[]>(`${apiUrl}/cart?userId=${userId}`)
      .subscribe(cartRes => {
        this.cart = cartRes;

        this._httpClinet.get<any[]>(`${apiUrl}/products`)
          .subscribe(prodRes => {
            this.products = prodRes;

            // this.cartProducts = this.products.filter(prod =>
            //   this.isInCart(prod.id, this.cart)
            // );

            const cartIds = new Set(this.cart.map(item => item.prodId));           
            this.cartProducts = this.products.filter(prod =>
              cartIds.has(prod.id)
            );
            // console.log(this.cartProducts);

          });

      });
  }







}
