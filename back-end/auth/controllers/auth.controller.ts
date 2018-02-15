import { Get, Post, Controller, Param } from "@nestjs/common";
import { AuthService } from "../services/auth.service";

@Controller("auth")
export class AuthController {
	constructor(private authService: AuthService) {
	}

	@Get("login")
	async getToken(): Promise<any> {
		return this.authService.createToken();
	}
}
