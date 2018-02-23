import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SingInEntity, SingUpEntity, Execute, TokenResultEntity } from '../../../../entity';
import { Observable } from 'rxjs/Observable';


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
