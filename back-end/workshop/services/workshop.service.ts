import { Model, Document } from "mongoose";
import { Component } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { AddressEntity, WorkshopEntity } from "../../../entity";
import { WorkshopSchema, AddressSchema } from "../../schema/register.schema";

@Component()
export class WorkshopService {
	constructor(@InjectModel(WorkshopSchema) private readonly workshopModel: Model<WorkshopEntity & Document>) { }

	async create(appointment: WorkshopEntity): Promise<WorkshopEntity> {
		const createdCat = new this.workshopModel(appointment);
		return await createdCat.save();
	}

	async findAll(): Promise<WorkshopEntity[]> {
		return await this.workshopModel.find().exec();
	}

	async find(id: string): Promise<WorkshopEntity> {
		return await this.workshopModel.findById(id).exec();
	}
}