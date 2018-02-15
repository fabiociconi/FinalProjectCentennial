import { Module, NestModule, MiddlewaresConsumer } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { WorkshopController } from "./controllers/workshop.controller";
import { WorkshopService } from "./services/workshop.service";
import { WorkshopSchema } from "../schema/register.schema";

@Module({
	imports: [
		MongooseModule.forFeature([{ name: "Workshop", schema: WorkshopSchema }])
	],
	controllers: [WorkshopController],
	components: [WorkshopService]
})
export class WorkshopModule implements NestModule {
	public configure(consumer: MiddlewaresConsumer): MiddlewaresConsumer | void {
	}
}
