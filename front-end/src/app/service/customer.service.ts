import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PersonEntity } from '@app/entity';
import { Observable } from 'rxjs/Observable';
import { Execute } from 'xcommon/entity';

@Injectable()
export class CustomerService {

	constructor(private http: HttpClient) { }

	public getProfile(): Observable<PersonEntity> {
		return this.http.get<PersonEntity>('/api/customer');
	}

	public saveProfile(entity: PersonEntity): Observable<Execute<PersonEntity>> {
		return this.http.post<Execute<PersonEntity>>('/api/customer', entity);
	}
}
