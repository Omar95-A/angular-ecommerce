import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Products } from '../../core/interfaces/Products';
import {  RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CartDataService } from '../../core/services/cart-data.service';
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterLink,ButtonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {

  productDetails!: Products[];
  product!: Products;
  id: string =''

  constructor(private _activatedRoute: ActivatedRoute,
              private _cartDataService: CartDataService,) {}

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe((next: any) => this.id = next.params['id'])
    this.getProducts()
  }

  getProducts() {
    this._activatedRoute.data.subscribe((data: any) => {
      this.productDetails = data.details
      this.product = this.productDetails[0]
        // console.log(this.productDetails)
    });
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
  }

}
