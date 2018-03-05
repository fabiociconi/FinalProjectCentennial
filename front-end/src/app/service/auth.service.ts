import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';

import * as jwt from 'angular2-jwt-simple';

import { Execute } from 'xcommon/entity';
import { environment } from '@app/env';
import { SingInEntity, SingUpEntity, TokenResultEntity, TokenPayload, RoleType } from '@app/entity';


@Injectable()
export class AuthService {

	public token = '';
	public authenticated = false;
	public user: TokenPayload = null;

	constructor(private http: HttpClient, private route: Router) {
		this.token = localStorage.getItem('token');
		this.load();
	}

	public signIn(entity: SingInEntity): Observable<Execute<TokenResultEntity>> {
		const result = this.http.post<Execute<TokenResultEntity>>('/auth/signin', entity)
			.share();

		result.subscribe(res => {
			if (!res.hasError) {
				this.store(res.entity, entity.remember || false);
				this.initialRedirect();
			}
		});

		return result;
	}

	public signUp(entity: SingUpEntity): Observable<Execute<TokenResultEntity>> {
		const result = this.http.post<Execute<TokenResultEntity>>('/auth/signup', entity)
			.share();

		result.subscribe(res => {
			if (!res.hasError) {
				this.store(res.entity);
				this.initialRedirect();
			}
		});

		return result;
	}

	public signOut(redirect: boolean = true): void {
		localStorage.removeItem('token');
		this.token = '';
		this.authenticated = false;
		this.user = null;

		if (redirect) {
			this.initialRedirect();
		}
	}

	public initialRedirect(): void {
		if (!this.authenticated) {
			this.route.navigate(['/']);
			return;
		}

		if (this.authenticated && this.user.role === RoleType.Customer) {
			this.route.navigate(['customer']);
			return;
		}

		if (this.authenticated && this.user.role === RoleType.Workshop) {
			this.route.navigate(['workshop']);
			return;
		}
	}

	private load(): boolean {
		if (!this.token || this.token === '') {
			this.user = null;
			this.authenticated = false;
			return false;
		}

		try {
			const decode: TokenPayload = jwt.decode(this.token, environment.secret);
			this.user = decode;
			this.authenticated = true;
			return true;
		} catch (error) {
			return false;
		}
	}

	private store(entity: TokenResultEntity, save: boolean = true): void {
		this.token = entity.token;

		if (save) {
			localStorage.setItem('token', entity.token);
		}

		this.load();
	}
}
