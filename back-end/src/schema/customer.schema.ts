import * as mongoose from 'mongoose';
import { AddressSchema } from './';

export const PersonSchema = new mongoose.Schema(
	{
		firstName: String,
		lastName: String,
		email: { type: String, required: true, unique: true },
		phone: String,
		birthDay: Date,
		createdAt: Date,
		updatedAt: Date,
		__v: Number
	});

export const CarSchema = new mongoose.Schema(
	{
		licencePlate: String,
		brand: String,
		color: String,
		model: String,
		createdAt: Date,
		updatedAt: Date,
		__v: Number
	});

export const CustomerSchema = new mongoose.Schema(
	{
		_id: String,
		person: PersonSchema,
		address: [AddressSchema],
		cars: [CarSchema]
	},
	{
		_id: false
	});