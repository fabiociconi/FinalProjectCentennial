import { Model, Document, Mongoose, Schema, mongo } from 'mongoose';
import { Component } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CustomerSchema } from '@app/schema';
import { CustomerEntity, PersonEntity, CarEntity, AddressEntity } from '@app/entity';
import { Execute } from 'xcommon/entity';
import { PreSaveDateCheck } from '@app/service/date.helper';

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

	public async save(_id: string, person: PersonEntity): Promise<Execute<PersonEntity>> {
		const result = new Execute<PersonEntity>();

		PreSaveDateCheck(person);

		const dbResult = await this.customerModel.update({ _id }, { person }).exec();
		result.entity = await this.find(_id);

		return result;
	}

	public async findCars(_id: string): Promise<CarEntity[]> {
		const result = await this.customerModel.findById(_id, { cars: 1 }).exec();
		return result ? result.cars : null;
	}

	public async findCar(_id: string, _idCar): Promise<CarEntity> {
		const result = await this.customerModel.findOne({ _id, 'cars._id': _idCar }, { 'cars.$': 1 }).exec();
		return result && result.cars ? result.cars[0] : null;
	}

	public async saveCar(_id: string, car: CarEntity): Promise<Execute<CarEntity>> {

		const result = new Execute<CarEntity>();

		PreSaveDateCheck(car);

		if (!car._id) {
			car._id = new mongo.ObjectId()
			const dbResult = await this.customerModel.update({ _id }, { $push: { cars: car } }).exec();
			result.entity = car;
			return result;
		}

		const dbResult = await this.customerModel.update({ _id, 'cars._id': car._id }, { $set: { 'cars.$': car } }).exec();
		result.entity = car;
		return result;
	}

	public async deleteCar(_id: string, _idCar: string): Promise<Execute<CarEntity>> {

		const result = new Execute<CarEntity>();
		const dbResult = await this.customerModel.findByIdAndUpdate( _id, { $pull: { cars: { _id: _idCar } } }).exec();
		return result;
	}

	public async findAddresses(_id: string): Promise<AddressEntity[]> {
		const result = await this.customerModel.findById(_id, { address: 1 }).exec();
		return result ? result.address : null;
	}

	public async findAddress(_id: string, _idAddress): Promise<AddressEntity> {
		const result = await this.customerModel.findOne({ _id, 'address._id': _idAddress }, { 'address.$': 1 }).exec();
		return result && result.address ? result.address[0] : null;
	}

	public async saveAddress(_id: string, address: AddressEntity): Promise<Execute<AddressEntity>> {

		const result = new Execute<AddressEntity>();

		PreSaveDateCheck(address);

		if (!address._id) {
			address._id = new mongo.ObjectId()
			const x = await this.customerModel.update({ _id }, { $push: { address: address } }).exec();
			result.entity = address;
			return result;
		}

		const y = await this.customerModel.update({ _id, 'address._id': address._id }, { $set: { 'address.$': address } }).exec();
		result.entity = address;
		return result;
	}

	public async deleteAddress(_id: string, _idAddress: string): Promise<Execute<AddressEntity>> {
		const result = new Execute<AddressEntity>();
		const dbResult = await this.customerModel.findByIdAndUpdate( _id, { $pull: { address: { _id: _idAddress } } }).exec();
		return result;
	}
}
