import { Module, NestModule, MiddlewaresConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ServiceModule } from '@app/service/service.module';
import { ProfilerController } from './customer.controller';

@Module({
	controllers: [ProfilerController],
	imports: [ServiceModule]
})
export class CustomerModule implements NestModule {
	public configure(consumer: MiddlewaresConsumer): MiddlewaresConsumer | void {
	}
}
