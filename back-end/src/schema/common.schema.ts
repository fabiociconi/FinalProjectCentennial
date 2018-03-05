import * as mongoose from 'mongoose';

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
		street: String,
		number: String,
		city: String,
		province: String,
		postalcode: String,
		createdAt: Date,
		updatedAt: Date,
		__v: Number
	});