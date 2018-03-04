import * as mongoose from 'mongoose';
import { AddressSchema } from './';

export const CompanySchema = new mongoose.Schema({
	legalName: String,
	comertialName: String,
	phone: String,
	createdAt: Date,
	updatedAt: Date,
	__v: Number
});

export const WorkshopSchema = new mongoose.Schema(
	{
		_id: String,
		company: CompanySchema,
		address: [AddressSchema]
	},
	{
		_id: false
	});
