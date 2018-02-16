import { Get, Post, Controller, Param, Body } from "@nestjs/common";
import { ApiUseTags, ApiImplicitBody } from "@nestjs/swagger";

import { TokenResultEntity, LoginEntity, UserEntity } from "../../../entity";
import { Execute } from "../../../entity/execute";
import { AuthService } from "../../service/auth.service";

@Controller("auth")
@ApiUseTags("auth")
export class AuthController {
	constructor(private authService: AuthService) {
	}

	@Post("signin")
	public async signin(@Body() entity: LoginEntity): Promise<Execute<TokenResultEntity>> {
		return this.authService.signin(entity);
	}

	@Post("signup")
	public async signup(@Body() entity: UserEntity): Promise<Execute<TokenResultEntity>> {
		return this.authService.signup(entity);
	}
}
