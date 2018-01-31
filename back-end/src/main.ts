import { NestFactory } from "@nestjs/core";
import { ApplicationModule } from "./app.module";
import * as express from "express";

async function bootstrap() {
	const instance = express();
	const app = await NestFactory.create(ApplicationModule, instance);
	await app.listen(3000);
}

bootstrap();
