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