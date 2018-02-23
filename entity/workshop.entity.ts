import { EntityBase, AddressEntity } from './';

export class CompanyEntity extends EntityBase {
	legalName: string;
	comertialName: string;
}

export class WorkshopEntity extends EntityBase {
	company: CompanyEntity;
	address: AddressEntity[];
}
