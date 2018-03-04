import { EntityBase, AddressEntity } from './common.entity';

export class CompanyEntity extends EntityBase {
	legalName: string;
	comertialName: string;
	phone: string;
	createdAt?: Date;
	updatedAt?: Date;
	__v: number;
}

export class WorkshopEntity extends EntityBase {
	company: CompanyEntity;
	address: AddressEntity[];
}
