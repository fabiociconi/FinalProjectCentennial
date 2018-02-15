import * as passport from "passport";
import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { ServeStaticMiddleware } from "@nest-middlewares/serve-static";

import { AuthModule } from "./auth/auth.module";
import { CustomerModule } from "./customer/customer.module";
import { WorkshopModule } from "./workshop/workshop.module";
import { RegisterFeatures } from "./schema/register.schema";

@Module({
	imports: [
		MongooseModule.forRoot("mongodb://localhost/eworkshop"),
		RegisterFeatures,
		AuthModule,
		CustomerModule,
		WorkshopModule
	]
})
export class ApplicationModule implements NestModule {

	public configure(consumer: MiddlewaresConsumer): MiddlewaresConsumer | void {
		ServeStaticMiddleware.configure("./wwwroot", { index: ["index.html"] });

		consumer
			.apply(ServeStaticMiddleware)
			.forRoutes({ path: "*", method: RequestMethod.ALL });

		consumer
			.apply(passport.authenticate("jwt", { session: false }))
			.forRoutes({ path: "/api/**", method: RequestMethod.ALL });
	}
}
