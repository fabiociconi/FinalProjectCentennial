import { Model, Document } from "mongoose";
import { Component } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { IAddressEntity, ICustomerEntity } from "../../../entity";
import { CustomerSchema, AddressSchema } from "../../schema/register.schema";

@Component()
export class CustomerService {
	constructor(@InjectModel(CustomerSchema) private customerModel: Model<ICustomerEntity & Document>) { }

	async create(appointment: ICustomerEntity): Promise<ICustomerEntity> {
		const createdCat = new this.customerModel(appointment);
		return await createdCat.save();
	}

	async findAll(): Promise<ICustomerEntity[]> {
		return await this.customerModel.find().exec();
	}

	async find(id: string): Promise<ICustomerEntity> {
		return await this.customerModel.findById(id).exec();
	}
}