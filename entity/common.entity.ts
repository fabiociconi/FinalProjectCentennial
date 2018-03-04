export abstract class EntityBase {
	_id?: string;
}

export class AddressEntity extends EntityBase {
	street: string;
	number: string;
	city: string;
	province: string;
	postalcode: string;
	createdAt?: Date;
	updatedAt?: Date;
}
