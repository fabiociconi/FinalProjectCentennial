import * as mongoose from "mongoose";
import { MongooseModule } from "@nestjs/mongoose";
import { Stream } from "stream";
import { ApiModelProperty } from "@nestjs/swagger";

export class PeopleEntity {
	@ApiModelProperty()
	_id: string;

	@ApiModelProperty()
	name: string;

	@ApiModelProperty()
	age: number;
	
	@ApiModelProperty()
	breed: string;

	@ApiModelProperty()
	address: AddressEntity[];
}

export class AddressEntity {
	@ApiModelProperty()	
	_id: string;

	@ApiModelProperty()	
	street: string;

	@ApiModelProperty()	
	number: string;

	@ApiModelProperty()	
	city: string;
}

export const AddressSchema = new mongoose.Schema(
	{
		street: String,
		number: String,
		city: String
	}
);

export const PeopleSchema = new mongoose.Schema(
	{
		_id: String,
		name: String,
		age: Number,
		breed: String,
		address: [AddressSchema]
	},
	{
		_id: false
	});

export const SchemaFeatures = MongooseModule.forFeature([
	{ name: "People", schema: PeopleSchema }
]);