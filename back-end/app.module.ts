import * as passport from "passport";
import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { ServeStaticMiddleware } from "@nest-middlewares/serve-static";

import { AuthModule } from "./auth/auth.module";
import { CustomerModule } from "./customer/customer.module";
import { WorkshopModule } from "./workshop/workshop.module";
import { ServiceModule } from "./service/service.module";
import { FallbackMiddleware } from "./app-middleware/fallback.middleware";

@Module({
	imports: [
		AuthModule,
		CustomerModule,
		WorkshopModule,
		ServiceModule
	]
})
export class ApplicationModule implements NestModule {

	public configure(consumer: MiddlewaresConsumer): MiddlewaresConsumer | void {
		ServeStaticMiddleware
			.configure("./wwwroot", { index: ["index.html"], fallthrough: true });

		FallbackMiddleware
			.configure("./wwwroot/index.html");

		consumer
			.apply(ServeStaticMiddleware)
			.forRoutes({ path: "*", method: RequestMethod.ALL });

		consumer
			.apply(passport.authenticate("jwt", { session: false }))
			.forRoutes({ path: "/api/**", method: RequestMethod.ALL });

		consumer
			.apply(FallbackMiddleware)
			.forRoutes({ path: "*", method: RequestMethod.GET });
	}
}
