import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../../service";
import { RoleType } from "../../../entity";

@Injectable()
export class AdminGuard implements CanActivate {
	constructor(private router: Router, private auth: AuthService) {
	}

	public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

		if (!this.auth.IsAuthenticated() || this.auth.Role !== RoleType.Admin) {
			this.router.navigate(["/account/sign-in"]);
			return false;
		}

		return true;
	}
}