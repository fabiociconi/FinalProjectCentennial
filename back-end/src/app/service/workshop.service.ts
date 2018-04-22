import { Model, Document, Mongoose, Schema, mongo } from 'mongoose';
import { Component } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Execute } from 'xcommon/entity';
import { AddressEntity, WorkshopEntity, CompanyEntity, ServicesEntity, WorkshopPriceTableEntity } from '@app/entity';
import { WorkshopSchema, AddressSchema } from '@app/schema';
import { PreSaveDateCheck } from '@app/service/date.helper';

@Component()
export class WorkshopService {
	constructor(@InjectModel(WorkshopSchema) private readonly workshopModel: Model<WorkshopEntity & Document>) { }

	public async create(workshop: WorkshopEntity): Promise<WorkshopEntity> {
		const model = new this.workshopModel(workshop);
		return await model.save();
	}

	public async find(id: string): Promise<CompanyEntity> {
		const result = await this.workshopModel.findById(id, { company: 1 }).exec();
		return result ? result.company : null;
	}

	public async save(_id: string, company: CompanyEntity): Promise<Execute<CompanyEntity>> {
		const result = new Execute<CompanyEntity>();

		PreSaveDateCheck(company);

		const dbResult = await this.workshopModel.update({ _id }, { company }).exec();
		result.entity = await this.find(_id);

		return result;
	}

	public async findAll(): Promise<WorkshopEntity[]> {
		const result = await this.workshopModel.find({ }, { company: 1, address: 1, priceTable: 1,  }).exec();
		return result;
	}

	public async findPricesTable(_id: string): Promise<WorkshopPriceTableEntity[]> {
		const result = await this.workshopModel.findById(_id, { priceTable: 1 }).exec();
		return result ? result.priceTable : null;
	}

	public async findPriceTable(_id: string, _idPriceTable: number): Promise<WorkshopPriceTableEntity> {
		const result = await this.workshopModel.findOne({ _id, 'priceTable.id': _idPriceTable }, { 'priceTable.$': 1 }).exec();
		return result && result.priceTable ? result.priceTable[0] : null;
	}

	public async savePriceTable(_id: string, priceTable: WorkshopPriceTableEntity): Promise<Execute<WorkshopPriceTableEntity>> {

		const result = new Execute<WorkshopPriceTableEntity>();
		result.addMessage(await this.deletePriceTable(_id, priceTable.id));

		const x = await this.workshopModel.update({ _id }, { $push: { priceTable } }).exec();
		result.entity = priceTable;
		return result;

	}

	public async deletePriceTable(_id: string, _idPriceTable: number): Promise<Execute<WorkshopPriceTableEntity>> {
		const result = new Execute<WorkshopPriceTableEntity>();
		const dbResult = await this.workshopModel.findByIdAndUpdate(_id, { $pull: { priceTable: { id: _idPriceTable } } }).exec();
		return result;
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
		const dbResult = await this.workshopModel.findByIdAndUpdate(_id, { $pull: { address: { _id: _idAddress } } }).exec();
		return result;
	}

	public getServicesDefault(): ServicesEntity[] {
		const result: ServicesEntity[] = [];

		result.push({ id: 1, name: 'Oil change', description: 'Preventive maintenance should be performed seasonally as it may increase the longevity of your vehicle' });
		result.push({ id: 2, name: 'Battery test', description: 'Check how good is your battery' });
		result.push({ id: 3, name: 'Tire rotation and Inflation', description: 'Increase your tires life time doing the rotation' });
		result.push({ id: 4, name: 'Windshield washer', description: 'Have a clean vision is important' });
		result.push({ id: 5, name: 'Engine diagnostics', description: 'Engine diagnostics can identify emissions or sensor problems, and in some case, prevent catalytic converter damage.' });
		result.push({ id: 6, name: 'Fuel injector', description: 'Proper maintenance of fuel injectors can significantly improve your vehicle’s performance, help fuel system components attain their intended life span and reduce harmful emissions.' });
		result.push({ id: 7, name: 'Brake inspection', description: 'To identify parts that are worn or no longer meet design specifications before they damage other parts of the brake system. This helps minimize repair costs over the long term.' });
		result.push({ id: 8, name: 'Steering & suspension inspection', description: 'To make sure that your wheels stay in contact with the road and the vehicle doesn’t veer off course.' });

		return result;
	}
}
