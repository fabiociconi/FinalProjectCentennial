import { Injectable, Injector } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs/observable";

import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

	private auth: AuthService;

	constructor(private inj: Injector) {
	}

	public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		if (!this.auth) {
			this.auth = this.inj.get(AuthService);
		}

		const authHeader = this.auth.GetAuthorizationHeader();
		const authReq = req.clone({ headers: req.headers.set("Authorization", authHeader) });
		return next.handle(authReq);
	}
}