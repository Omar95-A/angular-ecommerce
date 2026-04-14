import { Component } from '@angular/core';
import { UserDataService } from '../../core/services/user-data.service';
import { ActivatedRoute } from '@angular/router';
import { Products } from '../../core/interfaces/Products';
import {  RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterLink,ButtonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {

  // productDetails: Products[] = []
  // product: Products | null = null;

  productDetails!: Products[];
  product!: Products;
  id: string =''

  constructor(private _userDataService: UserDataService, private _activatedRoute:ActivatedRoute) {}

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe((next: any) => this.id = next.params['id'])
    this.getProducts()
  }

  getProducts() {
    this._activatedRoute.data.subscribe((data: any) => {
      this.productDetails = data.details
      this.product = this.productDetails[0]
    
        console.log(this.productDetails)
    });
  }

  // getProducts() {
  //   this._userDataService.getDetails(this.id).subscribe((next) => {
  //     this.productDetails = next;
  //     this.product = this.productDetails[0]
  //       // console.log(next)
  //       // console.log(this.productDetails[0])
  //   });
  // }

}
