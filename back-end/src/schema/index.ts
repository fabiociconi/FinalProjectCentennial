import { MongooseModule } from '@nestjs/mongoose';
import { WorkshopSchema, CustomerSchema, UserSchema } from './';

export * from './common.schema';
export * from './customer.schema';
export * from './workshop.schema';

export const DataBaseSchemas = MongooseModule.forFeature([
	{ name: 'user', schema: UserSchema },
	{ name: 'customer', schema: CustomerSchema },
	{ name: 'workshop', schema: WorkshopSchema }
]);
