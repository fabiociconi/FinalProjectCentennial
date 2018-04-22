import * as mongoose from 'mongoose';
import { AddressSchema } from './';

export const CompanySchema = new mongoose.Schema({
	legalName: { type: String, required: true, trim: true },
	comertialName: { type: String, required: true, trim: true },
	phone: { type: String, required: false, trim: true },
	createdAt: Date,
	updatedAt: Date,
	__v: Number
});

export const PriceTable = new mongoose.Schema(
	{
		id: Number,
		name: String,
		description: String,
		price: Number
	},
	{
		_id: false
	});

export const WorkshopSchema = new mongoose.Schema(
	{
		_id: String,
		company: CompanySchema,
		address: [AddressSchema],
		priceTable: [PriceTable]
	},
	{
		_id: false
	});
