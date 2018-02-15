import * as mongoose from "mongoose";
import { MongooseModule } from "@nestjs/mongoose";

export const AddressSchema = new mongoose.Schema(
	{
		_id: String,
		street: String,
		number: String,
		city: String,
		province: String,
		postalcode: String
	}
);

export const CustomerSchema = new mongoose.Schema(
	{
		_id: String,
		firstName: String,
		lastName: String,
		address: [AddressSchema]
	},
	{
		_id: false
	});

export const WorkshopSchema = new mongoose.Schema(
	{
		_id: String,
		firstName: String,
		lastName: String,
		address: [AddressSchema]
	},
	{
		_id: false
	});

export const RegisterFeatures = MongooseModule.forFeature([
	{ name: "Customer", schema: CustomerSchema },
	{ name: "Workshop", schema: WorkshopSchema }
]);