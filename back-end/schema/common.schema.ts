import * as mongoose from "mongoose";

export const UserSchema = new mongoose.Schema(
	{
		_id: String,
		name: String,
		password: String,
		role: Number
	},
	{
		_id: false
	});

export const AddressSchema = new mongoose.Schema(
	{
		unity: Number,
		number: Number,
		street: String,
		city: String,
		province: String,
		country: String,
		postalCode: String
	}
);