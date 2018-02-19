import { Module, NestModule, MiddlewaresConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProfilerController } from './customer.controller';
import { ServiceModule } from '../service/service.module';

@Module({
	controllers: [ProfilerController],
	imports: [ServiceModule]
})
export class CustomerModule implements NestModule {
	public configure(consumer: MiddlewaresConsumer): MiddlewaresConsumer | void {
	}
}
