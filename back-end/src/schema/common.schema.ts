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
		country: String,
		postalcode: String,
		Latitude: Number,
		Longitude: Number,
		createdAt: Date,
		updatedAt: Date,
		__v: Number
	});

export const AppointmentSchema = new mongoose.Schema(
	{
		idPerson: String,
		idworkshop: String,
		idCar: String,
		status: Number,
		createdAt: Date,
		updatedAt: Date,
		__v: Number
	});