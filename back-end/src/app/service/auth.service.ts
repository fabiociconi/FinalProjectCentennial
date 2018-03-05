import * as jwt from 'jsonwebtoken';
import { Model, Document } from 'mongoose';
import { Component } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Execute, ExecuteMessageType } from 'xcommon/entity';

import { environment } from '@app/env';
import { UserSchema } from '@app/schema';

import { CustomerService } from '@app/service/customer.service';
import { WorkshopService } from '@app/service/workshop.service';

import { UserEntity, SingUpEntity, SingInEntity, RoleType } from '@app/entity';
import { TokenResultEntity, TokenPayload } from '@app/entity';

@Component()
export class AuthService {

	private validRoles = [RoleType.Customer, RoleType.Workshop];

	constructor(
		@InjectModel(UserSchema) private userModel: Model<UserEntity & Document>,
		private customerService: CustomerService,
		private workshopService: WorkshopService) { }

	public async signup(entity: SingUpEntity): Promise<Execute<TokenResultEntity>> {
		const result = new Execute<TokenResultEntity>();
		const check = await this.userModel.findById(entity.email).exec();

		if (check) {
			result.addMessage(ExecuteMessageType.Error, 'User already exists');
			return result;
		}

		if (!this.validRoles.find(c => c === entity.role)) {
			result.addMessage(ExecuteMessageType.Error, 'Invalid user role');
			return result;
		}

		const user: UserEntity = {
			_id: entity.email,
			role: entity.role,
			name: `${entity.firstName} ${entity.lastName}`,
			password: entity.password
		};

		const userSaveResult = await new this.userModel(user).save();

		if (entity.role === 2) {
			const customerSaveResult = await this.customerService.create({
				_id: entity.email,
				person: {
					firstName: entity.firstName,
					lastName: entity.lastName,
					email: entity.email,
					phone: entity.phone,
					birthDay: new Date()
				},
				address: [],
				cars: []
			});
		}

		if (entity.role === 3) {
			const workshopSaveResult = await this.workshopService.create({
				_id: entity.email,
				company: {
					legalName: entity.firstName,
					comertialName: entity.lastName,
					phone: entity.phone
				},
				address: []
			});
		}

		result.entity = this.createToken({
			email: entity.email,
			name: entity.firstName,
			role: entity.role
		});

		return result;
	}

	public async signin(entity: SingInEntity): Promise<Execute<TokenResultEntity>> {

		const result = new Execute<TokenResultEntity>();
		const user = await this.userModel.findById(entity.email).exec();

		if (!user || user.password !== entity.password) {
			result.addMessage(ExecuteMessageType.Error, 'Invalid user name and/or passowrd');
			return result;
		}

		result.entity = this.createToken({
			email: user._id,
			role: user.role,
			name: user.name
		});

		return result;
	}

	private createToken(payload: TokenPayload): TokenResultEntity {

		const expires = 7 * 60 * 60;
		const token = jwt.sign(payload, environment.secret, { expiresIn: expires });

		return {
			expires,
			token
		};
	}

	public async validateUser(signedUser): Promise<boolean> {
		return true;
	}
}
