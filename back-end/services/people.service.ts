import { Model, Document } from "mongoose";
import { Component } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PeopleSchema, PeopleEntity } from "../schemas/people.schema";

@Component()
export class PeopleService {
	constructor( @InjectModel(PeopleSchema) private readonly peopleModel: Model<PeopleEntity & Document>) { }

	async create(people: PeopleEntity): Promise<PeopleEntity> {
		const createdCat = new this.peopleModel(people);
		return await createdCat.save();
	}

	async findAll(): Promise<PeopleEntity[]> {
		const result = await this.peopleModel.find().exec();
		return result;
	}

	async find(email: string): Promise<PeopleEntity> {
		return await this.peopleModel.findById(email).exec();
	}

	async findB(email: string): Promise<PeopleEntity[]> {
		return await this.peopleModel.find({ _id: email }).exec();
	}
}