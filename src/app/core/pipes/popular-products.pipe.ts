import { Pipe, PipeTransform } from '@angular/core';
import { Products } from '../interfaces/Products';

@Pipe({
  name: 'popularProductsPipe',
  standalone: true,
})
export class PopularProductsPipe implements PipeTransform {

  transform(product: Products[]): Products[] {
    return product.filter((prod)=> prod?.isPopular == true)
  }

}
