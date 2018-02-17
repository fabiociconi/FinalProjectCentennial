import { ApiModelProperty } from "@nestjs/swagger";

export abstract class EntityBase {
	@ApiModelProperty()
	_id?: string;
}

export class AddressEntity extends EntityBase {
	@ApiModelProperty()
	unity: Number;

	@ApiModelProperty()
	number: Number;
	
	@ApiModelProperty()
	street: string;

	@ApiModelProperty()
	city: string;

	@ApiModelProperty()
	province: string;

	@ApiModelProperty()
	country: string;

	@ApiModelProperty()
	postalcode: string;
}