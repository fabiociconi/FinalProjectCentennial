import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PersonEntity, CarEntity, AddressEntity, WorkshopEntity, SearchFilter, AppointmentEntity, CompanyEntity } from '@app/entity';
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

	public getAddresses(): Observable<AddressEntity[]> {
		return this.http.get<AddressEntity[]>('/api/customer/address');
	}

	public getAddress(id: string): Observable<AddressEntity> {
		return this.http.get<AddressEntity>(`/api/customer/address/${id}`);
	}

	public saveAddress(entity: AddressEntity): Observable<Execute<AddressEntity>> {
		return this.http.post<Execute<AddressEntity>>('/api/customer/address/', entity);
	}

	public deleteAddress(id: string): Observable<Execute<AddressEntity>> {
		return this.http.delete<Execute<AddressEntity>>(`/api/customer/address/${id}`);
	}

	public findworkshopById(id: string, idAddress: string): Observable<WorkshopEntity> {
		return this.http.get<WorkshopEntity>(`/api/customer/findworkshop/${id}/${idAddress}`);
	}

	public findworkshop(filter: SearchFilter): Observable<WorkshopEntity[]> {
		return this.http.post<WorkshopEntity[]>('/api/customer/findworkshop', filter);
	}

	public findAppointments(): Observable<AppointmentEntity[]> {
		return this.http.get<AppointmentEntity[]>('/api/customer/appoitment');
	}

	public findAppointment(id: string): Observable<AppointmentEntity> {
		return this.http.get<AppointmentEntity>(`/api/customer/appoitment/${id}`);
	}

	public saveAppointment(entity: AppointmentEntity): Observable<Execute<AppointmentEntity>> {
		return this.http.post<Execute<AppointmentEntity>>(`/api/customer/appoitment/`, entity);
	}
}
