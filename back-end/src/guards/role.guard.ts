import { Guard, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs/Observable';

import { RoleType, TokenPayload } from '@app/entity';

@Guard()
export class RolesGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) { 
		console.log('...');
	}

	canActivate(req, context: ExecutionContext): boolean {
		const { parent, handler } = context;
		const roles = this.reflector.get<RoleType[]>('roles', handler) || this.reflector.get<RoleType[]>('roles', parent);
		
		if (!roles) {
			return true;
		}

		const user: TokenPayload = req.user;
		const hasRole = !!roles.find((role) => !!(user.role === role));
		return user && user.role && hasRole;
	}
}