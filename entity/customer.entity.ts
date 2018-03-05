import { EntityBase, AddressEntity } from './common.entity';

export class PersonEntity extends EntityBase {
	firstName: string;
	lastName: string;
	email: string;
	birthDay: Date;
	phone: string;
}

export class CarEntity extends EntityBase {
	licencePlate: string;
	brand: string;
	color: string;
	model: string;
}

export class CustomerEntity extends EntityBase {
	person: PersonEntity;
	address: AddressEntity[];
	cars: CarEntity[];
}
