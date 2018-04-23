import { MongooseModule } from '@nestjs/mongoose';
import { WorkshopSchema, CustomerSchema, UserSchema } from './';
import { AppointmentSchema } from './common.schema';

export * from './common.schema';
export * from './customer.schema';
export * from './workshop.schema';

export const DataBaseSchemas = MongooseModule.forFeature([
	{ name: 'user', schema: UserSchema },
	{ name: 'customer', schema: CustomerSchema },
	{ name: 'workshop', schema: WorkshopSchema },
	{ name: 'appointment', schema: AppointmentSchema }
]);
