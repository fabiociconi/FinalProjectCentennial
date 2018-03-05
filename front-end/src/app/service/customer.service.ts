import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PersonEntity, CarEntity } from '@app/entity';
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

	public getCars(): Observable<CarEntity[]> {
		return this.http.get<CarEntity[]>('/api/customer/car');
	}

	public getCar(id: string): Observable<CarEntity> {
		return this.http.get<CarEntity>(`/api/customer/car/${id}`);
	}

	public saveCar(entity: CarEntity): Observable<Execute<CarEntity>> {
		return this.http.post<Execute<CarEntity>>('/api/customer/car/', entity);
	}

	public deleteCar(id: string): Observable<Execute<CarEntity>> {
		return this.http.delete<Execute<CarEntity>>(`/api/customer/car/${id}`);
	}
}
