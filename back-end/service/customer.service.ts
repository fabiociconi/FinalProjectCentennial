import { Model, Document } from "mongoose";
import { Component } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { CustomerSchema } from "../schema/";
import { CustomerEntity, PersonEntity, CarEntity } from "../../entity";

@Component()
export class CustomerService {
	constructor(@InjectModel(CustomerSchema) private customerModel: Model<CustomerEntity & Document>) { }

	public async create(customer: CustomerEntity): Promise<CustomerEntity> {
		const model = new this.customerModel(customer);
		return await model.save();
	}

	public async find(_id: string): Promise<PersonEntity> {
		const result = await this.customerModel.findById(_id, { person: 1 }).exec();
		return result ? result.person : null;
	}

	public async save(_id: string, person: PersonEntity): Promise<PersonEntity> {
		await this.customerModel.updateOne({ _id }, { person });
		return person;
	}

	public async findCars(_id: string): Promise<CarEntity[]> {
		const result = await this.customerModel.findById(_id, { cars: 1 }).exec();
		return result ? result.cars : null;
	}

	public async saveCars(_id: string, car: CarEntity): Promise<CarEntity> {

		if (car._id) {
			await this.customerModel.findOneAndUpdate({ _id, "cars._id": car._id }, { $set: { "cars.$": car } }).exec();
			return car;
		}

		await this.customerModel.update({ _id }, { $push: { cars : car } }).exec();
		return car;
	}
}