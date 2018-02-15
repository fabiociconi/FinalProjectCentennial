import { Model, Document } from "mongoose";
import { Component } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { IAddressEntity, IWorkshopEntity } from "../../../entity";
import { WorkshopSchema, AddressSchema } from "../../schema/register.schema";

@Component()
export class WorkshopService {
	constructor(@InjectModel(WorkshopSchema) private readonly workshopModel: Model<IWorkshopEntity & Document>) { }

	async create(appointment: IWorkshopEntity): Promise<IWorkshopEntity> {
		const createdCat = new this.workshopModel(appointment);
		return await createdCat.save();
	}

	async findAll(): Promise<IWorkshopEntity[]> {
		return await this.workshopModel.find().exec();
	}

	async find(id: string): Promise<IWorkshopEntity> {
		return await this.workshopModel.findById(id).exec();
	}
}