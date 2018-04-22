import { EntityBase, AddressEntity } from './common.entity';

export class CompanyEntity extends EntityBase {
	legalName: string;
	comertialName: string;
	phone: string;
}

export class WorkshopEntity extends EntityBase {
	company: CompanyEntity;
	address: AddressEntity[];
	priceTable: WorkshopPriceTableEntity[];
}

export class WorkshopPriceTableEntity {
	id: number;
	name: string;
	description: string;
	price: number;
}