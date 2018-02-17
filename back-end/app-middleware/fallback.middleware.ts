import { Middleware, NestMiddleware, ExpressMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { ServerResponse } from "http";
import * as path from "path";

@Middleware()
export class FallbackMiddleware implements NestMiddleware {

	public static configure(fallBackFile: string) {
		this.fallBackFile = path.resolve(fallBackFile);
	}

	private static fallBackFile: string;

	public resolve(...args: any[]): ExpressMiddleware {
		return (req: Request, res: Response, next: NextFunction) => {

			if (req.method === "GET" && req.accepts("html")) {
				res
					.status(200)
					.sendFile(FallbackMiddleware.fallBackFile);

				return;
			}

			next();
		};
	}
}