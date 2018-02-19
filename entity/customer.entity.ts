import { ApiModelProperty } from '@nestjs/swagger';
import { EntityBase, AddressEntity } from './';

export class PersonEntity extends EntityBase {
	@ApiModelProperty()
	firstName: string;

	@ApiModelProperty()
	lastName: string;

	@ApiModelProperty()
	email: string;

	@ApiModelProperty()
	birthDay: Date;
}

export class CarEntity extends EntityBase {
	@ApiModelProperty()
	licencePlate: string;

	@ApiModelProperty()
	brand: string;

	@ApiModelProperty()
	color: string;

	@ApiModelProperty()
	model: string;
}

export class CustomerEntity extends EntityBase {
	@ApiModelProperty()
	person: PersonEntity;

	@ApiModelProperty()
	address: AddressEntity[];

	@ApiModelProperty()
	cars: CarEntity[];
}
