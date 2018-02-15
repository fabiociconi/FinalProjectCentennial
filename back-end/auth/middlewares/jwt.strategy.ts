import * as passport from "passport";
import { ExtractJwt, Strategy, VerifiedCallback, StrategyOptions } from "passport-jwt";
import { Component, Inject } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { NextFunction } from "express-serve-static-core";

@Component()
export class JwtStrategy extends Strategy {

	constructor(private readonly authService: AuthService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			passReqToCallback: true,
			secretOrKey: "secret"
		},
			(req, payload, done) => this.verify(req, payload, done)
		);

		passport.use(this);
	}

	public verify(req: Request, payload: any, done: VerifiedCallback): void {
		const isValid = this.authService.validateUser(payload);

		if (!isValid) {
			return done("Unauthorized", false);
		}

		done(null, payload);
	}
}