import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PersonEntity, CarEntity, AddressEntity, CompanyEntity, WorkshopEntity, WorkshopPriceTableEntity, AppointmentEntity, SearchFilter } from '@app/entity';
import { Observable } from 'rxjs/Observable';
import { Execute } from 'xcommon/entity';
import { ServicesEntity } from '../../../../entity';

@Injectable()
export class WorkshopService {

	constructor(private http: HttpClient) { }

	public getProfile(): Observable<WorkshopEntity> {
		return this.http.get<WorkshopEntity>('/api/workshop');
	}

	public saveProfile(entity: CompanyEntity): Observable<Execute<CompanyEntity>> {
		return this.http.post<Execute<CompanyEntity>>('/api/workshop', entity);
	}

	public getAddresses(): Observable<AddressEntity[]> {
		return this.http.get<AddressEntity[]>('/api/workshop/address');
	}

	public getServices(): Observable<ServicesEntity[]> {
		return this.http.get<ServicesEntity[]>('/api/workshop/services');
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

	public getPricesTable(): Observable<WorkshopPriceTableEntity[]> {
		return this.http.get<WorkshopPriceTableEntity[]>(`/api/workshop/pricetable`);
	}

	public getPriceTable(id: string): Observable<WorkshopPriceTableEntity> {
		return this.http.get<WorkshopPriceTableEntity>(`/api/workshop/pricetable/${id}`);
	}

	public savePriceTable(entity: WorkshopPriceTableEntity): Observable<Execute<WorkshopPriceTableEntity>> {
		return this.http.post<Execute<WorkshopPriceTableEntity>>('/api/workshop/pricetable/', entity);
	}

	public deletePriceTable(id: string): Observable<Execute<WorkshopPriceTableEntity>> {
		return this.http.delete<Execute<WorkshopPriceTableEntity>>(`/api/workshop/pricetable/${id}`);
	}

	public findAppointments(): Observable<AppointmentEntity[]> {
		return this.http.get<AppointmentEntity[]>('/api/workshop/appoitment');
	}

	public findAppointment(id: string): Observable<AppointmentEntity> {
		return this.http.get<AppointmentEntity>(`/api/workshop/appoitment/${id}`);
	}

	public saveAppointment(entity: AppointmentEntity): Observable<Execute<AppointmentEntity>> {
		return this.http.post<Execute<AppointmentEntity>>(`/api/workshop/appoitment/`, entity);
	}
}
