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
	postalcode: string;
}
