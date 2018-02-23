import * as passport from 'passport';
import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { ServiceModule } from '../service/service.module';

@Module({
	controllers: [AuthController],
	components: [JwtStrategy],
	imports: [ServiceModule]
})
export class AuthModule implements NestModule {

	public configure(consumer: MiddlewaresConsumer): MiddlewaresConsumer | void {
	}
}
