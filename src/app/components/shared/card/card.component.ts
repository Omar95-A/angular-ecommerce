import { Component, Input } from '@angular/core';
import { Products } from '../../../core/interfaces/Products'
import { SlicePipe } from '@angular/common';
import { UserDataService } from '../../../core/services/user-data.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [SlicePipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

    @Input({required: true}) cardNum!: number;

    // myproducts!: Products[];
    products: Array<Products> | undefined;

    constructor(private _userDataService: UserDataService) {}

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

    getProducts() {
        this._userDataService.getProducts().subscribe((next) => this.products= next);
    }
}
