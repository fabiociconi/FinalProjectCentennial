import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/do';

import { AuthService } from '@app/service/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

	private auth: AuthService;

	constructor(private inj: Injector) {
	}

	public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		if (!this.auth) {
			this.auth = this.inj.get(AuthService);
		}

		const header = `Bearer ${this.auth.token}`;
		const authReq = req.clone({ headers: req.headers.set('Authorization', header) });
		return next.handle(authReq).do((event: HttpEvent<any>) => {
			// Sucess
		}, (err: any) => {
			if (err instanceof HttpErrorResponse) {
				if (err.status === 401) {
					this.auth.signOut(true);
				}

				if (err.status === 403) {
					console.log('Unauthorized access');
				}
			}
		});
	}
}
