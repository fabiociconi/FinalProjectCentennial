import * as jwt from "jsonwebtoken";
import { Model, Document } from "mongoose";
import { Component } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { TokenResultEntity, UserEntity, LoginEntity, TokenPayload } from "../../entity";
import { ApplicationConfig } from "../../params";
import { UserSchema } from "../schema/register.schema";
import { CustomerService } from "./customer.service";
import { WorkshopService } from "./workshop.service";

@Component()
export class AuthService {
	constructor(
		@InjectModel(UserSchema) private userModel: Model<UserEntity & Document>,
		private customerService: CustomerService,
		private workshopService: WorkshopService) { }

	public async signup(user: UserEntity): Promise<UserEntity> {

this.userModel.f

		return new Promise<UserEntity>(async (resolve, reject) => {

			const check = await this.customerService.find(user._id);

			if (check) {
				reject("User already exists");
				return;
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

			const result = this.createToken({
				email: user._id,
				name: user.firstName,
				role: 1
			});

			resolve(result);
		});
	}

	public async signin(login: LoginEntity): Promise<TokenResultEntity> {

		const promise = this.userModel.findById(login.email).exec();

		return new Promise<TokenResultEntity>((resolve, reject) => {

			promise.then(user => {
				if (!user || user.passowrd !== login.password) {
					reject("Invalid User");
					return;
				}

				resolve(this.createToken({
					email: user._id,
					role: user.role,
					name: user.firstName
				}));
			});

		});
	}

	private createToken(payload: TokenPayload): TokenResultEntity {
		const expires = 60 * 60;
		const token = jwt.sign(payload, ApplicationConfig.TokenSecret, { expiresIn: expires });

		return {
			expires,
			token
		};
	}

	async validateUser(signedUser): Promise<boolean> {
		return true;
	}
}