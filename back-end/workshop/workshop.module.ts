import { Module, NestModule, MiddlewaresConsumer } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { WorkshopController } from "./workshop.controller";
import { ServiceModule } from "../service/service.module";

@Module({
	controllers: [WorkshopController],
	imports: [ServiceModule]
})
export class WorkshopModule implements NestModule {
	public configure(consumer: MiddlewaresConsumer): MiddlewaresConsumer | void {
	}
}
