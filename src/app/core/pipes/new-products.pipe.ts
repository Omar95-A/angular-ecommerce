import { Pipe, PipeTransform } from '@angular/core';
import { Products } from '../interfaces/Products';

@Pipe({
  name: 'newProducts',
  standalone: true
})
export class NewProductsPipe implements PipeTransform {

  transform(product: Products[]): Products[] {
    return product.filter((prod)=> prod?.isNew == true)
  }

}
