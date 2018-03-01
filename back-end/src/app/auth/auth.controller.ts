import { Get, Post, Controller, Param, Body } from '@nestjs/common';
import { ApiUseTags, ApiImplicitBody } from '@nestjs/swagger';
import { Execute } from 'xcommon/entity';

import { TokenResultEntity, SingInEntity, SingUpEntity } from '@app/entity';
import { AuthService } from '@app/service/auth.service';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {
	}

	@Post('signin')
	@ApiImplicitBody({ name: 'signin', type: SingInEntity })
	public async signin(@Body() entity: SingInEntity): Promise<Execute<TokenResultEntity>> {
		return await this.authService.signin(entity);
	}

	@Post('signup')
	@ApiImplicitBody({ name: 'singup', type: SingUpEntity })
	public async signup(@Body() entity: SingUpEntity): Promise<Execute<TokenResultEntity>> {
		return await this.authService.signup(entity);
	}
}
