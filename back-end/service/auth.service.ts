import * as jwt from "jsonwebtoken";
import { Model, Document } from "mongoose";
import { Component } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { UserEntity, TokenResultEntity, SingUpEntity, SingInEntity, TokenPayload } from "../../entity";
import { Execute, MessageType, RoleType } from "../../entity";
import { ApplicationConfig } from "../../params";
import { UserSchema } from "../schema/";
import { CustomerService } from "./customer.service";
import { WorkshopService } from "./workshop.service";
import { ExecuteMessageType } from "xcommon";

@Component()
export class AuthService {
	constructor(
		@InjectModel(UserSchema) private userModel: Model<UserEntity & Document>,
		private customerService: CustomerService,
		private workshopService: WorkshopService) { }

	public async signup(signUp: SingUpEntity): Promise<Execute<TokenResultEntity>> {
		const result = new Execute<TokenResultEntity>();
		const check = await this.userModel.findById(signUp.email).exec();

		if (check) {
			result.addMessage(MessageType.Error, "User already exists");
			return result;
		}

		const user: UserEntity = {
			_id: signUp.email,
			role: signUp.role,
			name: `${signUp.firstName} ${signUp.lastName}`,
			password: signUp.passowrd
		};

		const userSaveResult = await new this.userModel(user).save();

		if (signUp.role === 2) {
			const customerSaveResult = await this.customerService.create({
				_id: signUp.email,
				person: {
					firstName: signUp.firstName,
					lastName: signUp.lastName,
					email: signUp.email,
					phone: signUp.phone,
					birthDay: new Date()
				},
				address: [],
				cars: []
			});
		}

		if (signUp.role === 3) {
			const workshopSaveResult = await this.workshopService.create({
				_id: signUp.email,
				company: {
					legalName: signUp.firstName,
					comertialName: signUp.lastName
				},
				address: []
			});
		}

		result.entity = await this.createToken({
			email: signUp.email,
			name: signUp.firstName,
			role: signUp.role
		});

		return result;
	}

	public async signin(login: SingInEntity): Promise<Execute<TokenResultEntity>> {

		const result = new Execute<TokenResultEntity>();
		const user = await this.userModel.findById(login.email).exec();

		if (!user || user.password !== login.password) {
			result.addMessage(MessageType.Error, "Invalid user name and/or passowrd");
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
			const token = jwt.sign(payload, ApplicationConfig.TokenSecret, { expiresIn: expires });

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