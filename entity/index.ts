export interface IEntityBase{
	_id: string;
}

export interface ICustomerEntity extends IEntityBase {
	firstName: string;
	lastName: string;
	address: IAddressEntity[];
}

export interface IAddressEntity extends IEntityBase {
	street: string;
	number: string;
	city: string;
	province: string;
	postalcode: string;
}

export interface IWorkshopEntity extends IEntityBase {
	firstName: string;
	lastName: string;
	address: IAddressEntity[];
}