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

export const UserSchema = new mongoose.Schema(
	{
		_id: String,
		name: String,
		passowrd: String,
		role: Number
	},
	{
		_id: false
	});

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
		legalName: String,
		comertialName: String,
		address: [AddressSchema]
	},
	{
		_id: false
	});

export const DataBaseSchemas = MongooseModule.forFeature([
	{ name: "user", schema: UserSchema },
	{ name: "customer", schema: CustomerSchema },
	{ name: "workshop", schema: WorkshopSchema }
]);