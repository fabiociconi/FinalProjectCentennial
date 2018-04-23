import { Module, NestModule, MiddlewaresConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DataBaseSchemas } from '@app/schema';
import { CustomerService } from '@app/service/customer.service';
import { WorkshopService } from '@app/service/workshop.service';
import { AuthService } from '@app/service/auth.service';
import { environment } from '@app/env';
import { AppoitmentService } from './appointment.service';

@Module({
	imports: [
		MongooseModule.forRoot(environment.database),
		DataBaseSchemas],
	components: [WorkshopService, CustomerService, AuthService, AppoitmentService],
	exports: [WorkshopService, CustomerService, AuthService]
})
export class ServiceModule implements NestModule {
	public configure(consumer: MiddlewaresConsumer): MiddlewaresConsumer | void {
	}
}
