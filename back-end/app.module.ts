import { Module, NestModule, MiddlewaresConsumer } from "@nestjs/common";
import { RequestMethod } from "@nestjs/common/enums";
import { ServeStaticMiddleware } from "@nest-middlewares/serve-static";
import { MongooseModule } from "@nestjs/mongoose";

import { PeopleController } from "./controllers/people.controller";
import { CarsController } from "./controllers/cars.controller";
import { SchemaFeatures } from "./schemas/people.schema";
import { PeopleService } from "./services/people.service";
import { AppointmentService } from "./services/appoinment.service";
import { AppointmentController } from "./controllers/appointments.controller";

@Module({
	imports: [
		MongooseModule.forRoot("mongodb://localhost/eworkshop"),
		SchemaFeatures
	],
	controllers: [PeopleController, CarsController, AppointmentController],
	components: [PeopleService, AppointmentService],
})
export class ApplicationModule implements NestModule {

	public configure(consumer: MiddlewaresConsumer): MiddlewaresConsumer | void {
		ServeStaticMiddleware.configure("./wwwroot", { index: ["index.html"] });
		consumer.apply(ServeStaticMiddleware).forRoutes({ path: "*", method: RequestMethod.ALL }, );
	}
}
