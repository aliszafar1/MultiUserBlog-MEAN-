import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AppService } from './services/app.services';
// import "rxjs/add/operator/take";

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(private router: Router, private as: AppService){ }

    canActivate(){
        if(this.as.checkCookie()){
            console.log('authGuard: Authenticated');
            return true;
        } else {
            console.log('authGuard: not Authenticated');
            this.router.navigate(['/signin']);
            return false;
        }
    }
}