import { Model, Document } from 'mongoose';
import { Component } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { AddressEntity, WorkshopEntity } from '@app/entity';
import { WorkshopSchema, AddressSchema } from '@app/schema';

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
}