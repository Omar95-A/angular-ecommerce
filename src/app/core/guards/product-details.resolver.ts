import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { UserDataService } from '../services/user-data.service';
import { EMPTY, Observable } from 'rxjs';

export const productDetailsResolver: ResolveFn<Observable<any>> = (route, state) => {
  const id = route.paramMap.get('id')
  const product = inject(UserDataService)
  return id ? product.getDetails(id) : EMPTY;
};
