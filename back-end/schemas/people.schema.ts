import * as mongoose from "mongoose";
import { MongooseModule } from "@nestjs/mongoose";
import { Stream } from "stream";
import { ApiModelProperty } from '@nestjs/swagger';

export interface PeopleEntity {
	_id: string,
	name: string,
	age: number,
	breed: string,
	address: AddressEntity[];
}

export interface AddressEntity {
	_id: string;
	street: string,
	number: string,
	city: string
}

export interface WorkshopEntity {
	_id: string,
	name: string,
	workingHours: string,
	address: [AddressEntity]
}

export interface AppointmentEntity {
	workshopName: string,
	time: string,
	address: AddressEntity
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

export const WorkshopSchema = new mongoose.Schema(
	{
		_id: String,
		name: String,
		workingHours: String,
		address: [AddressSchema]
	},
	{
		_id: false
	});

export const AppointmentSchema = new mongoose.Schema(
	{
		workshopName: String,
		time: String,
		address: AddressSchema
	});



export const SchemaFeatures = MongooseModule.forFeature([
	{ name: "People", schema: PeopleSchema },
	{ name: "Workshop", schema: WorkshopSchema },
	{ name: "Appointment", schema: AppointmentSchema },

]);