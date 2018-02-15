import { Model, Document } from "mongoose";
import { Component } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { AddressEntity, CustomerEntity } from "../../../entity";
import { CustomerSchema, AddressSchema } from "../../schema/register.schema";

@Component()
export class CustomerService {
	constructor(@InjectModel(CustomerSchema) private customerModel: Model<CustomerEntity & Document>) { }

	async create(appointment: CustomerEntity): Promise<CustomerEntity> {
		const createdCat = new this.customerModel(appointment);
		return await createdCat.save();
	}

	async findAll(): Promise<CustomerEntity[]> {
		return await this.customerModel.find().exec();
	}

	async find(id: string): Promise<CustomerEntity> {
		return await this.customerModel.findById(id).exec();
	}
}