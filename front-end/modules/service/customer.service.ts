import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/observable";
import { HttpUtilService } from "xcommon";

import { IPeopleEntity, IAddressesEntity, ICarsEntity, IExecute, IWorkshopsEntity, IWorkshopsFilter } from "../../entity";
import { IAppointmentsEntity, IAppointmentsFilter, IAppointmentsRatingsEntity, IAppointmentsRatingsFilter } from "../../entity";

@Injectable()
export class CustomerService {
	private ServiceUrl = "Customer";

	constructor(private utilService: HttpUtilService, private http: HttpClient) { }

	public GetProfile(): Observable<IPeopleEntity> {
		const url = this.utilService.BuidlUrl(this.ServiceUrl);
		return this.http.get<IPeopleEntity>(url);
	}

	public SetProfile(entity: IPeopleEntity): Observable<IExecute<IPeopleEntity>> {
		const url = this.utilService.BuidlUrl(this.ServiceUrl);
		return this.http.post<IExecute<IPeopleEntity>>(url, entity);
	}

	public GetAddresses(): Observable<IAddressesEntity[]> {
		const url = this.utilService.BuidlUrl(this.ServiceUrl, "address");
		return this.http.get<IAddressesEntity[]>(url);
	}

	public GetAddress(id: string): Observable<IAddressesEntity> {
		const url = this.utilService.BuidlUrl(this.ServiceUrl, "address", id);
		return this.http.get<IAddressesEntity>(url);
	}

	public SetAddress(entity: IAddressesEntity): Observable<IExecute<IAddressesEntity>> {
		const url = this.utilService.BuidlUrl(this.ServiceUrl, "address");
		return this.http.post<IExecute<IAddressesEntity>>(url, entity);
	}

	public GetCars(): Observable<ICarsEntity[]> {
		const url = this.utilService.BuidlUrl(this.ServiceUrl, "car");
		return this.http.get<ICarsEntity[]>(url);
	}

	public GetCar(id: string): Observable<ICarsEntity> {
		const url = this.utilService.BuidlUrl(this.ServiceUrl, "car", id);
		return this.http.get<ICarsEntity>(url);
	}

	public GetCarHistory(id: string): Observable<IAppointmentsEntity[]> {
		const url = this.utilService.BuidlUrl(this.ServiceUrl, "car", id, "appointment");
		return this.http.get<IAppointmentsEntity[]>(url);
	}

	public SetCar(entity: ICarsEntity): Observable<IExecute<ICarsEntity>> {
		const url = this.utilService.BuidlUrl(this.ServiceUrl, "car");
		return this.http.post<IExecute<ICarsEntity>>(url, entity);
	}

	public Search(filter: IWorkshopsFilter): Observable<IWorkshopsEntity[]> {
		const url = this.utilService.BuidlUrl(this.ServiceUrl, "search");
		return this.http.post<IWorkshopsEntity[]>(url, filter);
	}

	public GetWorkshop(id: string, idAddress: string): Observable<IWorkshopsEntity> {
		const filter: IWorkshopsFilter = {
			Key: id,
			IdAddress: idAddress,
			MaximumDistance: -1
		};
		const url = this.utilService.BuidlUrl(this.ServiceUrl, "search", "one");
		return this.http.post<IWorkshopsEntity>(url, filter);
	}

	public GetAppointments(): Observable<IAppointmentsEntity[]> {
		const url = this.utilService.BuidlUrl(this.ServiceUrl, "appointment");
		return this.http.get<IAppointmentsEntity[]>(url);
	}

	public GetAppointment(id: string): Observable<IAppointmentsEntity> {
		const url = this.utilService.BuidlUrl(this.ServiceUrl, "appointment", id);
		return this.http.get<IAppointmentsEntity>(url);
	}

	public SetAppointment(entity: IAppointmentsEntity): Observable<IExecute<IAppointmentsEntity>> {
		const url = this.utilService.BuidlUrl(this.ServiceUrl, "appointment");
		return this.http.post<IExecute<IAppointmentsEntity>>(url, entity);
	}
}