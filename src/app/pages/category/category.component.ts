import { Component } from '@angular/core';
import { Products } from '../../core/interfaces/Products';
import { UserDataService } from '../../core/services/user-data.service';
import { RouterLink } from '@angular/router';
import { CategoryDataService } from '../../core/services/category-data.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {
  
  allCategory: Products[] = []

  myUniqueTypes: any[]=[]

  // myCategories: string[] = ["watch","clothes","electronic","accessory"]

  constructor(private _userDataService: UserDataService, private _categoryDataService: CategoryDataService) {}

  ngOnInit() {
    this.displayAllCategory()
  }

  displayAllCategory() {
    this._categoryDataService.getCategoryProducts().subscribe(next => {
      this.myUniqueTypes = [...new Set(next.map((item: Products) => item.prodCategory))];
      // console.log(this.myUniqueTypes)
    });
  }

}
