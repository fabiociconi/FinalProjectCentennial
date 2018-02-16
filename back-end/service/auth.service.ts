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

	public async signup(singUp: SingUpEntity): Promise<Execute<TokenResultEntity>> {
		const result = new Execute<TokenResultEntity>();
		const check = await this.userModel.findById(singUp.email).exec();

		if (check) {
			result.addMessage(MessageType.Error, "User already exists");
			return result;
		}

		const user: UserEntity = {
			_id: singUp.email,
			role: singUp.role,
			name: `${singUp.firstName} ${singUp.lastName}`,
			passowrd: singUp.passowrd
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

		if (!user || user.passowrd !== login.password) {
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