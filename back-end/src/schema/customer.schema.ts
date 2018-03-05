import * as mongoose from 'mongoose';
import { AddressSchema } from './';

export const PersonSchema = new mongoose.Schema(
	{
		firstName: { type: String, required: true, trim: true },
		lastName: { type: String, required: true, trim: true },
		email: { type: String, required: true, trim: true, unique: true },
		phone:  { type: String, required: true, trim: true },
		birthDay: Date,
		createdAt: Date,
		updatedAt: Date,
		__v: Number
	});

export const CarSchema = new mongoose.Schema(
	{
		licencePlate: String,
		brand:  { type: String, required: true, trim: true },
		color:  { type: String, required: true, trim: true },
		model:  { type: String, required: true, trim: true },
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