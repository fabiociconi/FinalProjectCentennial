import { Req, Get, Post, Delete, Controller, Param, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiImplicitBody } from '@nestjs/swagger';

import { WorkshopEntity, AddressEntity, TokenPayload, CompanyEntity } from '../../../../entity';
import { WorkshopService } from '../service/workshop.service';
import { Execute } from 'xcommon/entity';

@ApiBearerAuth()
@ApiUseTags('workshop')
@Controller('api/workshop')
export class WorkshopController {
	constructor(private workshopService: WorkshopService) {
	}

	@Get()
	@ApiResponse({ status: 200, type: CompanyEntity })
	public async get(@Req() req: any): Promise<CompanyEntity> {
		const user: TokenPayload = req.user;
		return await this.workshopService.find(user.email);
	}

	@Post()
	@ApiResponse({ status: 200, type: CompanyEntity })
	async save(@Req() req: any, @Body() workshop: CompanyEntity): Promise<Execute<CompanyEntity>> {
		const user: TokenPayload = req.user;
		return this.workshopService.save(user.email, workshop);
	}

	@Get('address')
	@ApiResponse({ status: 200, type: AddressEntity })
	public async getAddresses(@Req() req: any): Promise<AddressEntity[]> {
		const user: TokenPayload = req.user;
		return await this.workshopService.findAddresses(user.email);
	}

	@Get('address/:id')
	@ApiResponse({ status: 200, type: AddressEntity })
	public async getAddress(@Req() req: any, @Param('id') idCar: string): Promise<AddressEntity> {
		const user: TokenPayload = req.user;
		return await this.workshopService.findAddress(user.email, idCar);
	}

	@Post('address')
	@ApiResponse({ status: 200, type: AddressEntity })
	@ApiImplicitBody({ name: 'address', type: AddressEntity })
	public async postAddress(@Req() req: any, @Body() address: AddressEntity): Promise<Execute<AddressEntity>> {
		const user: TokenPayload = req.user;
		return await this.workshopService.saveAddress(user.email, address);
	}

	@Delete('address/:id')
	@ApiResponse({ status: 200, type: AddressEntity })
	public async deleteAddress(@Req() req: any, @Param('id') idAddress: string): Promise<Execute<AddressEntity>> {
		const user: TokenPayload = req.user;
		return await this.workshopService.deleteAddress(user.email, idAddress);
	}
}
