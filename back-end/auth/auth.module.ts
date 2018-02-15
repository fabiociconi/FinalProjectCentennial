import * as passport from "passport";
import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from "@nestjs/common";

import { AuthController } from "./controllers/auth.controller";
import { AuthService } from "./services/auth.service";
import { JwtStrategy } from "./middlewares/jwt.strategy";

@Module({
	controllers: [AuthController],
	components: [AuthService, JwtStrategy],
	exports: [AuthService]
})
export class AuthModule implements NestModule {

	public configure(consumer: MiddlewaresConsumer): MiddlewaresConsumer | void {

	}
}
