import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { ProductDataService } from '../services/product-data.service';

export const productDetailsResolver: ResolveFn<Observable<any>> = (route, state) => {
  const id = route.paramMap.get('id')
  const product = inject(ProductDataService)
  return id ? product.getDetails(id) : EMPTY;
};
