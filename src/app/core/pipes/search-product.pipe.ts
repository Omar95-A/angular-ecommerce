import { Pipe, PipeTransform } from '@angular/core';
import { Products } from '../interfaces/Products';

@Pipe({
  name: 'searchProduct',
  standalone: true,
})
export class SearchProductPipe implements PipeTransform {

  transform(product: Products[], prodName: string): Products[] {
        // return product.filter((prod) => { prod?.prodTitle.includes(prodName) })
        return product.filter((prod)=> prod?.prodTitle.toLowerCase().includes(prodName.toLowerCase()) )
  }

}
