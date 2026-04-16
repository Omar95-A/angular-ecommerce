import { Component } from '@angular/core';
import { Products } from '../../core/interfaces/Products';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CategoryDataService } from '../../core/services/category-data.service';
import { CartDataService } from '../../core/services/cart-data.service';


@Component({
  selector: 'app-specific-category',
  standalone: true,
  imports: [RouterLink,ButtonModule],
  templateUrl: './specific-category.component.html',
  styleUrl: './specific-category.component.scss'
})
export class SpecificCategoryComponent {

  cateProduct: Products[] = []

  constructor(private _categoryDataService: CategoryDataService, 
              private _activatedRoute: ActivatedRoute,
              private _cartDataService: CartDataService) {}

  ngOnInit() {
    const type = this._activatedRoute.snapshot.paramMap.get('type') ?? ''
    this.getProducts(type);
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

  getProducts(t: string) {
    this._categoryDataService.getSpecifecCategoryProducts(t).subscribe((next) => {
      this.cateProduct = next;
        // console.log(this.cateProduct)
    });
  }

  removeFromCart(p: Products) {
    this._cartDataService.removeFromCart(p);
  }

  
}
