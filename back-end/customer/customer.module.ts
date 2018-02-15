import { Module, NestModule, MiddlewaresConsumer } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { ProfilerController } from "./controllers/customer.controller";
import { CustomerService } from "./services/customer.service";
import { CustomerSchema } from "../schema/register.schema";

@Module({
	imports: [
		MongooseModule.forFeature([{ name: "Customer", schema: CustomerSchema }])
	],
	controllers: [ProfilerController],
	components: [CustomerService]
})
export class CustomerModule implements NestModule {
	public configure(consumer: MiddlewaresConsumer): MiddlewaresConsumer | void {
	}
}
