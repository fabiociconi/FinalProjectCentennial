import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ApplicationModule } from './app.module';
import * as express from 'express';

import { environment } from './environments';
import { NotFoundExceptionFilter } from './filters/not-found-exception';

async function bootstrap() {
	const app = await NestFactory.create(ApplicationModule);

	if (environment.swagger) {
		const options = new DocumentBuilder()
			.setTitle('eWorkshop 2.0')
			.setDescription('eWorkshop 2.0 API description')
			.setVersion('1.0')
			.addBearerAuth('Authorization', 'header')
			.build();

		const document = SwaggerModule.createDocument(app, options);
		SwaggerModule.setup('/swagger', app, document);
	}

	app.useGlobalFilters(new NotFoundExceptionFilter());
	await app.listen(process.env.PORT || 3000);
}

bootstrap();
