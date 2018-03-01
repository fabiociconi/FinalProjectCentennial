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
	constructor(
		@InjectModel(UserSchema) private userModel: Model<UserEntity & Document>,
		private customerService: CustomerService,
		private workshopService: WorkshopService) { }

	public async signup(singUp: SingUpEntity): Promise<Execute<TokenResultEntity>> {
		const result = new Execute<TokenResultEntity>();
		const check = await this.userModel.findById(singUp.email).exec();

		if (check) {
			result.addMessage(ExecuteMessageType.Error, 'User already exists');
			return result;
		}

		const user: UserEntity = {
			_id: singUp.email,
			role: singUp.role,
			name: `${singUp.firstName} ${singUp.lastName}`,
			password: singUp.password
		};

		const userSaveResult = await new this.userModel(user).save();

		if (singUp.role === 2) {
			const customerSaveResult = await this.customerService.create({
				_id: singUp.email,
				person: {
					firstName: singUp.firstName,
					lastName: singUp.lastName,
					email: singUp.email,
					birthDay: new Date()
				},
				address: [],
				cars: []
			});
		}

		if (singUp.role === 3) {
			const workshopSaveResult = await this.workshopService.create({
				_id: singUp.email,
				company: {
					legalName: singUp.firstName,
					comertialName: singUp.lastName
				},
				address: []
			});
		}

		result.entity = await this.createToken({
			email: singUp.email,
			name: singUp.firstName,
			role: singUp.role
		});

		return result;
	}

	public async signin(login: SingInEntity): Promise<Execute<TokenResultEntity>> {

		const result = new Execute<TokenResultEntity>();
		const user = await this.userModel.findById(login.email).exec();

		if (!user || user.password !== login.password) {
			result.addMessage(ExecuteMessageType.Error, 'Invalid user name and/or passowrd');
			return result;
		}

		result.entity = await this.createToken({
			email: user._id,
			role: user.role,
			name: user.name
		});

		return result;
	}

	private createToken(payload: TokenPayload): Promise<TokenResultEntity> {

		return new Promise<TokenResultEntity>((resolve, reject) => {
			const expires = 60 * 60;
			const token = jwt.sign(payload, environment.tokenSecret, { expiresIn: expires });

			resolve({
				expires,
				token
			});
		});
	}

	async validateUser(signedUser): Promise<boolean> {
		return true;
	}
}
