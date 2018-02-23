import { Req, Get, Post, Controller, Param, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse } from '@nestjs/swagger';

import { WorkshopEntity, AddressEntity, TokenPayload } from '../../../../entity';
import { WorkshopService } from '../service/workshop.service';

@ApiBearerAuth()
@ApiUseTags('workshop')
@Controller('api/workshop')
export class WorkshopController {
	constructor(private workshopService: WorkshopService) {
	}

	@Get()
	@ApiResponse({ status: 200, type: WorkshopEntity })
	public async get(@Req() req: any): Promise<WorkshopEntity> {
		const user: TokenPayload = req.user;
		return await this.workshopService.find(user.email);
	}

	@Post()
	@ApiResponse({ status: 200, type: WorkshopEntity })
	async save(@Req() req: any, @Body() workshop: WorkshopEntity): Promise<WorkshopEntity> {
		return this.workshopService.create(workshop);
	}
}
