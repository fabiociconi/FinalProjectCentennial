import * as mongoose from "mongoose";
import { MongooseModule } from "@nestjs/mongoose";

export interface IPeople {
	name: String,
	age: Number,
	breed: String
}

export const PeopleSchema = new mongoose.Schema({
	name: String,
	age: Number,
	breed: String
});

export const SchemaFeatures = MongooseModule.forFeature([
	{ name: "People", schema: PeopleSchema }
]);