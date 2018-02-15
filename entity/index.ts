import { ApiModelProperty } from "@nestjs/swagger";

abstract class EntityBase {
	@ApiModelProperty()
	_id: string;
}

export class CustomerEntity extends EntityBase {
	@ApiModelProperty()
	firstName: string;

	@ApiModelProperty()
	lastName: string;

	@ApiModelProperty()
	address: AddressEntity[];
}

export class AddressEntity extends EntityBase {
	@ApiModelProperty()
	street: string;

	@ApiModelProperty()
	number: string;

	@ApiModelProperty()
	city: string;

	@ApiModelProperty()
	province: string;

	@ApiModelProperty()
	postalcode: string;
}

export class WorkshopEntity extends EntityBase {
	@ApiModelProperty()
	firstName: string;

	@ApiModelProperty()
	lastName: string;

	@ApiModelProperty()
	address: AddressEntity[];
}