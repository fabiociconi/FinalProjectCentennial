import { Model, Document, Mongoose, Schema, mongo } from 'mongoose';
import { Component } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Execute } from 'xcommon/entity';
import { AddressEntity, WorkshopEntity } from '@app/entity';
import { WorkshopSchema, AddressSchema } from '@app/schema';
import { PreSaveDateCheck } from '@app/service/date.helper';

@Component()
export class WorkshopService {
	constructor(@InjectModel(WorkshopSchema) private readonly workshopModel: Model<WorkshopEntity & Document>) { }

	public async create(workshop: WorkshopEntity): Promise<WorkshopEntity> {
		const model = new this.workshopModel(workshop);
		return await model.save();
	}

	public async find(id: string): Promise<WorkshopEntity> {
		return await this.workshopModel.findById(id).exec();
	}

	public async findAddresses(_id: string): Promise<AddressEntity[]> {
		const result = await this.workshopModel.findById(_id, { address: 1 }).exec();
		return result ? result.address : null;
	}

	public async findAddress(_id: string, _idAddress): Promise<AddressEntity> {
		const result = await this.workshopModel.findOne({ _id, 'address._id': _idAddress }, { 'address.$': 1 }).exec();
		return result && result.address ? result.address[0] : null;
	}

	public async saveAddress(_id: string, address: AddressEntity): Promise<Execute<AddressEntity>> {

		const result = new Execute<AddressEntity>();

		PreSaveDateCheck(address);

		if (!address._id) {
			address._id = new mongo.ObjectId()
			const x = await this.workshopModel.update({ _id }, { $push: { address: address } }).exec();
			result.entity = address;
			return result;
		}

		const y = await this.workshopModel.update({ _id, 'address._id': address._id }, { $set: { 'address.$': address } }).exec();
		result.entity = address;
		return result;
	}

	public async deleteAddress(_id: string, _idAddress: string): Promise<Execute<AddressEntity>> {
		const result = new Execute<AddressEntity>();
		const dbResult = await this.workshopModel.findByIdAndUpdate( _id, { $pull: { address: { _id: _idAddress } } }).exec();
		return result;
	}
}
