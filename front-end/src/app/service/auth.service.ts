import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Execute } from 'xcommon/entity';
import { SingInEntity, SingUpEntity, TokenResultEntity } from '@app/entity';


@Injectable()
export class AuthService {

	constructor(private http: HttpClient) {
	}

	public signIn(signIn: SingInEntity): Observable<Execute<TokenResultEntity>> {
		const result = this.http.post<Execute<TokenResultEntity>>('/auth/signin', signIn);
		return result;
	}

	public signUp(signUp: SingUpEntity): Observable<Execute<TokenResultEntity>> {
		const result = this.http.post<Execute<TokenResultEntity>>('/auth/signup', signUp);
		return result;
	}
}
