import { Component, OnChanges, OnInit, ViewEncapsulation } from '@angular/core';
import { UserDataService } from '../../core/services/user-data.service';
import { Products } from '../../core/interfaces/Products';
import { CardComponent } from '../../components/shared/card/card.component';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { SearchProductPipe } from '../../core/pipes/search-product.pipe';

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
  
  constructor(private _userDataService: UserDataService) {}

  ngOnInit() {
    this.getProducts();
  }

    getProducts() {
        const storeCart = localStorage.getItem('cartItem');
        const cartItem = storeCart ? JSON.parse(storeCart) : {};
        this._userDataService.getProducts().subscribe((response: Products[]) => {
          this.myAllProducts= response.map((prod)=>{return {...prod,isAdded: cartItem[prod.prodId] || false}})
        });
    }
}
