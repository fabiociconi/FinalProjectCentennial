import * as mongoose from "mongoose";
import { MongooseModule } from "@nestjs/mongoose";

export interface IPeople {
	_id: String,
	name: String,
	age: Number,
	breed: String
}

export const PeopleSchema = new mongoose.Schema(
	{
		_id: String,
		name: String,
		age: Number,
		breed: String
	},
	{
		_id: false
	});

export const SchemaFeatures = MongooseModule.forFeature([
	{ name: "People", schema: PeopleSchema }
]);