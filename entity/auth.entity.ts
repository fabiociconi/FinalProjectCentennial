import { ApiModelProperty } from '@nestjs/swagger';
import { RoleType, EntityBase } from './';

export class TokenPayload {
	@ApiModelProperty()
	name: string;

	@ApiModelProperty()
	email: string;

	@ApiModelProperty()
	role: RoleType;
}

export class TokenResultEntity {
	@ApiModelProperty()
	expires: number;

	@ApiModelProperty()
	token: string;
}

export class UserEntity {
	@ApiModelProperty()
	_id: string;

	@ApiModelProperty()
	name: string;

	@ApiModelProperty()
	passowrd: string;

	@ApiModelProperty()
	role: RoleType;
}

export class SingUpEntity {
	@ApiModelProperty()
	email: string;

	@ApiModelProperty()
	firstName: string;

	@ApiModelProperty()
	lastName: string;

	@ApiModelProperty()
	passowrd: string;

	@ApiModelProperty({ type: Number })
	role: RoleType;
}

export class SingInEntity {
	@ApiModelProperty()
	email: string;

	@ApiModelProperty()
	password: string;
}
