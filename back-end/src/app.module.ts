import { Module, NestModule, MiddlewaresConsumer } from "@nestjs/common";
import { RequestMethod } from "@nestjs/common/enums";
import { ServeStaticMiddleware } from "@nest-middlewares/serve-static";
import { MongooseModule } from "@nestjs/mongoose";

import { PeopleController } from "./controllers/people.controller";
import { SchemaFeatures } from "./schemas/people.schema";
import { PeopleService } from "./services/people.service";

@Module({
	imports: [
		MongooseModule.forRoot("mongodb://localhost/eworkshop"),
		SchemaFeatures
	],
	controllers: [PeopleController],
	components: [PeopleService],
})
export class ApplicationModule implements NestModule {

	public configure(consumer: MiddlewaresConsumer): MiddlewaresConsumer | void {
		ServeStaticMiddleware.configure("./wwwroot", { index: ["index.html"] });
		consumer.apply(ServeStaticMiddleware).forRoutes({ path: "*", method: RequestMethod.ALL }, );
	}
}
