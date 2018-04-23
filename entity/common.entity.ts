import { CarEntity, CustomerEntity, PersonEntity, CompanyEntity } from ".";

export abstract class EntityBase {
	_id?: string | any;
	createdAt?: Date;
	updatedAt?: Date;
	__v?: number;
}

export class AddressEntity extends EntityBase {
	street: string;
	number: string;
	city: string;
	province: string;
	country: string;
	postalcode: string;
	Latitude: number;
	Longitude: number;
}

export class ServicesEntity {
	id: number;
	name: string;
	description: string;
}

export class SearchFilter {
	longitude: number;
	latitude: number;
	distance: number;
	services: number[];
}

export class AppointmentEntity extends EntityBase {
	idPerson: string;
	idworkshop: string;
	idCar: string;
	status: number;
	person: PersonEntity;
	workshop: CompanyEntity;
	car: CarEntity;
	services: ServicesEntity[];
}