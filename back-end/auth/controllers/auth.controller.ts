import { Get, Post, Controller, Param, Body } from "@nestjs/common";
import { ApiUseTags, ApiImplicitBody } from "@nestjs/swagger";

import { TokenResultEntity, SingInEntity, SingUpEntity } from "../../../entity";
import { Execute } from "../../../entity/execute";
import { AuthService } from "../../service/auth.service";

@Controller("auth")
@ApiUseTags("auth")
export class AuthController {
	constructor(private authService: AuthService) {
	}

	@Post("signin")
	public async signin(@Body() entity: SingInEntity): Promise<Execute<TokenResultEntity>> {
		return this.authService.signin(entity);
	}

	@Post("signup")
	public async signup(@Body() entity: SingUpEntity): Promise<Execute<TokenResultEntity>> {
		return this.authService.signup(entity);
	}
}
