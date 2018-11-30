import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot } from "@angular/router";
import { Cookie } from "ng2-cookies/ng2-cookies";


@Injectable()
export class ChatRouteGuard implements CanActivate {
    
    constructor(private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot): boolean {
        console.log("In guard Service");

        if(Cookie.get('authToken') === undefined || Cookie.get('authToken') === '' || Cookie.get('authToken') === null) {
            this.router.navigate(['/']);
            return false;
        } else {
            return true;
        }
    }
}