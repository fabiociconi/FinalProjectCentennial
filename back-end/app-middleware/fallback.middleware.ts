import { Middleware, NestMiddleware, ExpressMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ServerResponse } from 'http';
import { environment } from '../../environments/environment';
import * as path from 'path';

@Middleware()
export class FallbackMiddleware implements NestMiddleware {

	private static fallBackFile: string;

	public static configure(fallBackFile: string) {
		this.fallBackFile = path.resolve(fallBackFile);
	}

	public resolve(...args: any[]): ExpressMiddleware {
		return (req: Request, res: Response, next: NextFunction) => {

			if (req.method === 'GET' && req.accepts('html')) {

				if (!environment.production) {
					res
						.status(200)
						.redirect('htpp://localhost:4200');

					return;
				}

				res
					.status(200)
					.sendFile(FallbackMiddleware.fallBackFile);

				return;
			}

			next();
		};
	}
}
