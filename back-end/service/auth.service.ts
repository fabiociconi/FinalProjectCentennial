import * as jwt from "jsonwebtoken";
import { Model, Document } from "mongoose";
import { Component } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { TokenResultEntity, UserEntity, LoginEntity, TokenPayload } from "../../entity";
import { Execute, MessageType } from "../../entity/execute";
import { ApplicationConfig } from "../../params";
import { UserSchema } from "../schema/register.schema";
import { CustomerService } from "./customer.service";
import { WorkshopService } from "./workshop.service";
import { ExecuteMessageType } from "xcommon";

@Component()
export class AuthService {
	constructor(
		@InjectModel(UserSchema) private userModel: Model<UserEntity & Document>,
		private customerService: CustomerService,
		private workshopService: WorkshopService) { }

	public async signup(user: UserEntity): Promise<Execute<TokenResultEntity>> {
		const result = new Execute<TokenResultEntity>();
		const check = await this.customerService.find(user._id);

		if (check) {
			result.addMessage(MessageType.Error, "User already exists");
			return result;
		}

		const userSaveResult = await new this.userModel(user).save();

		if (user.role === 2) {
			const customerSaveResult = await this.customerService.create({
				_id: user._id,
				firstName: user.firstName,
				lastName: user.lastName,
				address: []
			});
		}

		if (user.role === 3) {
			const workshopSaveResult = await this.workshopService.create({
				_id: user._id,
				legalName: user.firstName,
				comertialName: user.lastName,
				address: []
			});
		}

		result.entity = await this.createToken({
			email: user._id,
			name: user.firstName,
			role: 1
		});

		return result;
	}

	public async signin(login: LoginEntity): Promise<Execute<TokenResultEntity>> {

		const result = new Execute<TokenResultEntity>();
		const user = await this.userModel.findById(login.email).exec();

		if (!user || user.passowrd !== login.password) {
			result.addMessage(MessageType.Error, "Invalid user name and/or passowrd");
			return result;
		}

		result.entity = await this.createToken({
			email: user._id,
			role: user.role,
			name: user.firstName
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