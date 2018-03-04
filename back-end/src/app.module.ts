import * as passport from 'passport';
import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CorsMiddleware } from '@nest-middlewares/cors';
import { ServeStaticMiddleware } from '@nest-middlewares/serve-static';
import * as path from 'path';

import { AuthModule } from './app/auth/auth.module';
import { CustomerModule } from './app/customer/customer.module';
import { WorkshopModule } from './app/workshop/workshop.module';
import { ServiceModule } from './app/service/service.module';

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
		CorsMiddleware.configure({});

		ServeStaticMiddleware
			.configure('./public', { index: ['index.html'], fallthrough: true });

		consumer
			.apply(ServeStaticMiddleware)
			.forRoutes({ path: '*', method: RequestMethod.ALL });

		consumer
			.apply(passport.authenticate('jwt', { session: false }))
			.forRoutes({ path: '/api/**', method: RequestMethod.ALL });

		consumer
			.apply(CorsMiddleware)
			.forRoutes(
				{ path: '/api/**', method: RequestMethod.ALL },
				{ path: '/auth/**', method: RequestMethod.POST }
			);
	}
}
