import { Model, Document } from 'mongoose';
import { Component } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CustomerSchema } from '../../schema/';
import { CustomerEntity, PersonEntity, CarEntity } from '../../../../entity';

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
		await this.customerModel.update({ _id }, { person });
		return person;
	}

	public async findCars(_id: string): Promise<CarEntity[]> {
		const result = await this.customerModel.findById(_id, { cars: 1 }).exec();
		return result ? result.cars : null;
	}

	public async findCar(_id: string, _idCar): Promise<CarEntity> {
		const result = await this.customerModel.findOne({ _id, 'cars._id': _idCar }, { 'cars.$': 1 }).exec();
		return result && result.cars ? result.cars[0] : null;
	}

	public async saveCar(_id: string, car: CarEntity): Promise<CarEntity> {

		if (!car._id) {
			delete car._id;
			const x = await this.customerModel.update({ _id }, { $push: { cars: car } }).exec();
			return car;
		}

		const y = await this.customerModel.update({ _id, 'cars._id': car._id }, { $set: { 'cars.$': car } }).exec();
		return car;
	}
}
