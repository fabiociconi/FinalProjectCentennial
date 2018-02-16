import { ApiModelProperty } from "@nestjs/swagger";

abstract class EntityBase {
	@ApiModelProperty()
	_id: string;
}

export enum RoleType {
	admin = 1,
	customer = 2,
	workshop = 3
}

export class TokenResultEntity {
	@ApiModelProperty()
	expires: number;

	@ApiModelProperty()
	token: string;
}

export class TokenPayload {
	@ApiModelProperty()
	name: string;

	@ApiModelProperty()
	email: string;

	@ApiModelProperty()
	role: RoleType;
}

export class UserEntity extends EntityBase {
	@ApiModelProperty()
	firstName: string;

	@ApiModelProperty()
	lastName: string;

	@ApiModelProperty()
	passowrd: string;

	@ApiModelProperty()
	role: RoleType;
}

export class LoginEntity {
	@ApiModelProperty()
	email: string;

	@ApiModelProperty()
	password: string;
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
	legalName: string;

	@ApiModelProperty()
	comertialName: string;

	@ApiModelProperty()
	address: AddressEntity[];
}