/***************************************** WARNING *****************************************/
/* Don't write any code in this file, because it will be rewritten on the next generation. */
/*******************************************************************************************/

import { EntityAction } from "./enum";
import { IAddressesEntity, IPeopleEntity, ICarsEntity } from "./register";

export interface IAppointmentsEntity {
	IdAppointment: string; 
	IdWorkshop: string; 
	IdCar: string;
	IdAddress: string;
	AppointmentDate: Date; 
	Status: number; 
	CreateDate: Date; 
	ChangeDate: Date; 
	Date: Date; 
	Action: EntityAction;
	Workshop?: IPeopleEntity;
	Customer?: IPeopleEntity;
	Car?: ICarsEntity;
	Address?: IAddressesEntity;
	Services: IAppointmentsServicesEntity[];
}

export interface IAppointmentsFilter {
	Key?: string; 
	Keys?: Array<string>; 
	PageNumber?: number; 
	PageSize?: number; 
}

export interface IAppointmentsRatingsEntity {
	IdAppointmentRating: string; 
	IdAppointment: string; 
	RateValue: number; 
	CreateDate: Date; 
	ChangeDate: Date; 
	Comments: string; 
	Action: EntityAction; 
}

export interface IAppointmentsRatingsFilter {
	Key?: string; 
	Keys?: Array<string>; 
	PageNumber?: number; 
	PageSize?: number; 
}

export interface IAppointmentsServicesEntity {
	IdAppointmentService: string; 
	IdAppointment: string; 
	IdService: string; 
	Price: number; 
	Action: EntityAction; 
	Service: IServicesEntity;
}

export interface IAppointmentsServicesFilter {
	Key?: string; 
	Keys?: Array<string>; 
	PageNumber?: number; 
	PageSize?: number; 
}

export interface IServicesEntity {
	IdService: string; 
	Name: string;
	Selected: boolean;
	Description: string; 
	Action: EntityAction; 
}

export interface IServicesFilter {
	IdService?: string; 
	Key?: string; 
	Keys?: Array<string>; 
	PageNumber?: number; 
	PageSize?: number; 
}

