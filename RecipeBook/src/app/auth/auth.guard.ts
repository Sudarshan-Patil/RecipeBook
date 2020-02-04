import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, tap, take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot
        ): boolean | UrlTree | Promise<Boolean | UrlTree> | Observable<boolean | Ur> {
        return this.authService.user.pipe(
            take(1),
            map(user => {
                const isAuth =  !!user;
                if (isAuth) {
                    return true;
                } else {
                    return this.router.createUrlTree(['/auth']);
                }
            }), 
            // tap(isAuth => {
            //     if (!isAuth) {
            //         this.router.navigate['/auth'];
            //     }
            // })
        );
    }
}