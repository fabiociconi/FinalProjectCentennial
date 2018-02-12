import { Model, Document } from "mongoose";
import { Component } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { AppointmentEntity, AppointmentSchema } from "../schemas/people.schema";

@Component()
export class AppointmentService {
	constructor( @InjectModel(AppointmentSchema) private readonly appoimentModel: Model<AppointmentEntity & Document>) { }

	async create(appointment: AppointmentEntity): Promise<AppointmentEntity> {
		const createdCat = new this.appoimentModel(appointment);
		return await createdCat.save();
	}

	async findAll(): Promise<AppointmentEntity[]> {
		return await this.appoimentModel.find().exec();
	}

	async find(id: string): Promise<AppointmentEntity> {
		return await this.appoimentModel.findById(id).exec();
	}
}