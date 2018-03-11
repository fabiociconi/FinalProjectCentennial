import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PersonEntity, CarEntity, AddressEntity } from '@app/entity';
import { Observable } from 'rxjs/Observable';
import { Execute } from 'xcommon/entity';

@Injectable()
export class WorkshopService {

	constructor(private http: HttpClient) { }

	public getAddresses(): Observable<AddressEntity[]> {
		return this.http.get<AddressEntity[]>('/api/workshop/address');
	}

	public getAddress(id: string): Observable<AddressEntity> {
		return this.http.get<AddressEntity>(`/api/workshop/address/${id}`);
	}

	public saveAddress(entity: AddressEntity): Observable<Execute<AddressEntity>> {
		return this.http.post<Execute<AddressEntity>>('/api/workshop/address/', entity);
	}

	public deleteAddress(id: string): Observable<Execute<AddressEntity>> {
		return this.http.delete<Execute<AddressEntity>>(`/api/workshop/address/${id}`);
	}
}
