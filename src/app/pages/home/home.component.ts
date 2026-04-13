import { Component, ViewEncapsulation } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';
import { CommonModule, SlicePipe } from '@angular/common';
import { Products } from '../../core/interfaces/Products'
import { CardComponent } from '../../components/shared/card/card.component';
import { UserDataService } from '../../core/services/user-data.service';
import { PopularProductsPipe } from '../../core/pipes/popular-products.pipe';
import { NewProductsPipe } from '../../core/pipes/new-products.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [GalleriaModule, CommonModule, SlicePipe, CardComponent ,PopularProductsPipe, NewProductsPipe],
  providers: [],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

    images: any[] | undefined;
    homeProducts: Products[]=[];

    constructor(private _userDataService: UserDataService) {}

    responsiveOptions: any[] = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];

    
    ngOnInit() {
        this.getProducts();
        this.images = [  
            {
                itemImageSrc: './assets/cart1.jpg',
                thumbnailImageSrc: './assets/cart1.jpg',
                alt: 'Description for Image 1',
                title: 'Title 1'
            },
            {
                itemImageSrc: './assets/cart2.jpg',
                thumbnailImageSrc: './assets/cart2.jpg',
                alt: 'Description for Image 1',
                title: 'Title 1'
            },
        ];
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
        const storeCart = localStorage.getItem('cartItem');
        const cartItem = storeCart ? JSON.parse(storeCart) : {};
        this._userDataService.getProducts().subscribe((response: Products[]) => {
          this.homeProducts= response.map((prod)=>{return {...prod,isAdded: cartItem[prod.prodId] || false}});
        });
    }

}
