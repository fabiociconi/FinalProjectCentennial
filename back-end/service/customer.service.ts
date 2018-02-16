import { Model, Document } from "mongoose";
import { Component } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { CustomerSchema } from "../schema/register.schema";
import { CustomerEntity } from "../../entity";

@Component()
export class CustomerService {
	constructor(@InjectModel(CustomerSchema) private customerModel: Model<CustomerEntity & Document>) { }

	public async create(customer: CustomerEntity): Promise<CustomerEntity> {
		const model = new this.customerModel(customer);
		return await model.save();
	}

	public async findAll(): Promise<CustomerEntity[]> {
		return await this.customerModel.find().exec();
	}

	public async find(id: string): Promise<CustomerEntity> {
		return await this.customerModel.findById(id).exec();
	}
}