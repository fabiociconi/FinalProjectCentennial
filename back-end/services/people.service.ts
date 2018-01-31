import { Model, Document } from "mongoose";
import { Component } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PeopleSchema, IPeople } from "../schemas/people.schema";

@Component()
export class PeopleService {
	constructor( @InjectModel(PeopleSchema) private readonly peopleModel: Model<IPeople & Document>) { }

	async create(people: IPeople): Promise<IPeople> {
		const createdCat = new this.peopleModel(people);
		return await createdCat.save();
	}

	async findAll(): Promise<IPeople[]> {
		return await this.peopleModel.find().exec();
	}

	async find(email: string): Promise<IPeople> {
		return await this.peopleModel.findById(email).exec();
	}
}