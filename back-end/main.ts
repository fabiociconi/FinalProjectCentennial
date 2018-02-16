import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ApplicationModule } from "./app.module";
import * as express from "express";

async function bootstrap() {
	const app = await NestFactory.create(ApplicationModule);

	const options = new DocumentBuilder()
		.setTitle("eWorkshop 2.0")
		.setDescription("eWorkshop 2.0 API description")
		.setVersion("1.0")
		.addBearerAuth("Authorization", "header")
		.build();

	const document = SwaggerModule.createDocument(app, options);
	SwaggerModule.setup("/swagger", app, document);

	await app.listen(3000);
}

bootstrap();
