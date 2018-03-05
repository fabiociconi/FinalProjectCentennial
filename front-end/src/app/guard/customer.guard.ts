import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '@app/service/auth.service';
import { RoleType } from '@app/entity';

@Injectable()
export class CustomerGuard implements CanActivate {
	constructor(private router: Router, private auth: AuthService) { }

	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		if (this.auth.authenticated && this.auth.user.role !== RoleType.Customer) {
			this.router.navigate(['/']);
			return  false;
		}

		return true;
	}
}
