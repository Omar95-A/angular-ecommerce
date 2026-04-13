import { Component } from '@angular/core';
import { UserDataService } from '../../core/services/user-data.service';
import { Products } from '../../core/interfaces/Products';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-specific-category',
  standalone: true,
  imports: [RouterLink,ButtonModule],
  templateUrl: './specific-category.component.html',
  styleUrl: './specific-category.component.scss'
})
export class SpecificCategoryComponent {

  cateProduct: Products[] = []
  // name: string = cateProduct.prodCategory;

  constructor(private _userDataService: UserDataService, private _activatedRoute:ActivatedRoute) {}

  ngOnInit() {
    const type = this._activatedRoute.snapshot.paramMap.get('type') ?? ''
    // this.getAllCategory(type)
    this.getProducts(type)
  }

  getProducts(t: string) {

    this._userDataService.getSpecifecCategoryProducts(t).subscribe((next) => {
      this.cateProduct = next;

        console.log(this.cateProduct)

    });

  }


  // getAllCategory() {
  //   this._userDataService.getSpecifecCategoryProducts().subscribe((next) => {
  //     this.cateProduct = next;
  //     this.cateProductarr = next;
  //     console.log(this.cateProduct)
  //     console.log(next)
  //   })
  // }

  // getAllCategory(t: string) {
  //   this._userDataService.getSpecifecCategoryProducts(t).subscribe((next) => {
  //     this.cateProduct = next.cateProduct;
  //     console.log(this.cateProduct)
  //     console.log(next)
  //   })
  // }

}
