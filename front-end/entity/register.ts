/***************************************** WARNING *****************************************/
/* Don't write any code in this file, because it will be rewritten on the next generation. */
/*******************************************************************************************/

import { EntityAction, RoleType } from "./enum";
import { IServicesEntity } from "./Service";
import { ICoordinates } from "./util";

export interface IAddressesEntity {
	IdAddress: string; 
	IdPerson: string;
	Name?: string;
	Street: string; 
	StreetNumber: string; 
	City: string; 
	PostalCode: string; 
	Type: number; 
	Longitude: number; 
	Latitude: number;
	Distance?: number;
	Province: string; 
	Country: string; 
	Action: EntityAction; 
}

export interface IAddressesFilter {
	IdPerson?: string; 
	IdPeople?: Array<string>; 
	Key?: string; 
	Keys?: Array<string>; 
	PageNumber?: number; 
	PageSize?: number; 
}

export interface ICarsEntity {
	IdCar: string; 
	IdPerson: string; 
	Brand: string; 
	Color: string; 
	Year: number; 
	Trasmission: number; 
	LicensePlate: string; 
	FuelType: number; 
	CreateDate: Date; 
	Model: string; 
	Action: EntityAction; 
}

export interface ICarsFilter {
	IdPerson?: string; 
	Key?: string; 
	Keys?: Array<string>; 
	PageNumber?: number; 
	PageSize?: number; 
}

export interface ICarsHistoriesEntity {
	IdCarReportHistory: string; 
	IdCar: string; 
	Type: number; 
	CreateDate: Date; 
	Decription: string; 
	Action: EntityAction; 
}

export interface ICarsHistoriesFilter {
	Key?: string; 
	Keys?: Array<string>; 
	PageNumber?: number; 
	PageSize?: number; 
}

export interface ICustomersEntity {
	IdCustomer: string; 
	IdPerson: string; 
	Birthday?: Date; 
	Action: EntityAction; 
}

export interface ICustomersFilter {
	Key?: string; 
	Keys?: Array<string>; 
	PageNumber?: number; 
	PageSize?: number; 
}

export interface IPeopleEntity {
	IdPerson: string; 
	FirstName: string; 
	LastName: string; 
	Telephone: string; 
	Email: string; 
	CreateDate: Date; 
	ChangeDate: Date; 
	Role: RoleType; 
	Customer: ICustomersEntity; 
	Workshop: IWorkshopsEntity; 
	Action: EntityAction; 
}

export interface IPeopleFilter {
	FirstName?: string; 
	LastName?: string; 
	Email?: string; 
	Telephone?: string; 
	RoleType?: RoleType; 
	LoadDetails?: boolean; 
	Key?: string; 
	Keys?: Array<string>; 
	PageNumber?: number; 
	PageSize?: number; 
}

export interface ISignInEntity {
	Email: string; 
	Password: string; 
	RememberMe: boolean; 
}

export interface ISignUpEntity {
	Password: string; 
	PasswordConfirm: string; 
	RoleType: RoleType; 
	IdPerson: string; 
	FirstName: string; 
	LastName: string; 
	Telephone: string; 
	Email: string; 
	CreateDate: Date; 
	ChangeDate: Date; 
	Role: RoleType; 
	Customer: ICustomersEntity; 
	Workshop: IWorkshopsEntity; 
	Action: EntityAction; 
}

export interface ITokenEntity {
	Token: string; 
	IdPerson: string; 
	FirstName: string; 
	LastName: string; 
}

export interface IUsersEntity {
	IdUser: string; 
	IdPerson: string; 
	Password: string; 
	Role: RoleType; 
	Action: EntityAction; 
}

export interface IUsersFilter {
	Password?: string; 
	Key?: string; 
	Keys?: Array<string>; 
	PageNumber?: number; 
	PageSize?: number; 
}

export interface IWorkshopsEntity {
	IdWorkshop: string; 
	IdPerson: string;
	IdAddress: string;
	Description: string; 
	Person: IPeopleEntity; 
	Addresses: Array<IAddressesEntity>; 
	Services: Array<IWorkshopServicesEntity>; 
	Action: EntityAction; 
}

export interface IWorkshopServicesEntity {
	IdWorkshopService: string; 
	IdWorkshop: string; 
	IdService: string; 
	Price: number; 
	Service: IServicesEntity; 
	Action: EntityAction; 
}

export interface IWorkshopServicesFilter {
	IdWorkshop?: string; 
	IdWorkshops?: Array<string>; 
	IdWorkshopService?: string; 
	Key?: string; 
	Keys?: Array<string>; 
	PageNumber?: number; 
	PageSize?: number; 
}

export interface IWorkshopsFilter {
	Name?: string;
	IdAddress?: string;
	ServiceName?: string; 
	Street?: string; 
	City?: string; 
	Province?: string; 
	ClientLatitude?: number;
	ClientLongitude?: number; 
	MaximumDistance: number; 
	Key?: string; 
	Keys?: Array<string>;
	IdServices?: Array<string>;
	PageNumber?: number; 
	PageSize?: number; 
}

