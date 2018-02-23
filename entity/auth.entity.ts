import { RoleType, EntityBase } from './';

export class TokenPayload {
	name: string;
	email: string;
	role: RoleType;
}

export class TokenResultEntity {
	expires: number;
	token: string;
}

export class UserEntity {
	_id: string;
	name: string;
	password: string;
	role: RoleType;
}

export class SingUpEntity {
	email: string;
	firstName: string;
	lastName: string;
	password: string;
	role: RoleType;
}

export class SingInEntity {
	email: string;
	password: string;
}
