import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

export const authGuard: CanActivateFn = () => {
    const route = inject(Router);
    if(sessionStorage.getItem('token') != null) {
        return true;
    } else {
        route.navigate(['login']);
        return false;
    }
}