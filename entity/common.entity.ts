import { ApiModelProperty } from '@nestjs/swagger';

export abstract class EntityBase {
	@ApiModelProperty()
	_id?: string;
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
