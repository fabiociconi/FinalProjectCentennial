import { Module, NestModule, MiddlewaresConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DataBaseSchemas } from '../schema/';
import { CustomerService } from './customer.service';
import { WorkshopService } from './workshop.service';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

@Module({
	imports: [
		MongooseModule.forRoot(environment.dataBaseUri),
		DataBaseSchemas],
	components: [WorkshopService, CustomerService, AuthService],
	exports: [WorkshopService, CustomerService, AuthService]
})
export class ServiceModule implements NestModule {
	public configure(consumer: MiddlewaresConsumer): MiddlewaresConsumer | void {
	}
}
