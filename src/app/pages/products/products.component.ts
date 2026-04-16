import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Products } from '../../core/interfaces/Products';
import { CardComponent } from '../../components/shared/card/card.component';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { SearchProductPipe } from '../../core/pipes/search-product.pipe';
import { ProductDataService } from '../../core/services/product-data.service';
import { CartDataService } from '../../core/services/cart-data.service';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CardComponent,InputIconModule, IconFieldModule, InputTextModule, FormsModule, SearchProductPipe],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent  implements OnInit {

  productName: string ='';
  myAllProducts: Products[]=[];
  
  constructor(private _cartDataService: CartDataService, 
              private _productDataService: ProductDataService) {}

  ngOnInit() {
    this.getProducts();
  }

  // getProducts() {
  //   this._productDataService.getProducts()
  // }

  getProducts() {
    const storeCart = localStorage.getItem('cartItem');
    const cartItem = storeCart ? JSON.parse(storeCart) : {};
    this._productDataService.getAllProducts().subscribe((response: Products[]) => {
      // this.myAllProducts= response.map((prod)=>{return {...prod,isAdded: cartItem[prod.prodId] || false}})
      this.myAllProducts= response.filter((prod)=>{return {...prod,isAdded: true ? true : false}});
      // console.log(' this.myAllProduct',this.myAllProducts)
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

}
