import { Get, Post, Controller, Param, Body, Req, UseGuards, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiImplicitBody } from '@nestjs/swagger';

import { TokenPayload, PersonEntity, CarEntity, AddressEntity, RoleType, WorkshopEntity } from '@app/entity';
import { CustomerService } from '@app/service/customer.service';
import { RolesGuard, Roles } from '@app/guards';
import { Execute } from 'xcommon/entity';
import { WorkshopService } from '../service';

@ApiBearerAuth()
@ApiUseTags('customer')
@Roles(RoleType.Customer)
@Controller('api/customer')
export class ProfilerController {
	constructor(private customerService: CustomerService, private workshopService: WorkshopService) {
	}

	@Get()
	@ApiResponse({ status: 200, type: PersonEntity })
	public async get(@Req() req: any): Promise<PersonEntity> {
		const user: TokenPayload = req.user;
		return await this.customerService.find(user.email);
	}

	@Post()
	@ApiImplicitBody({ name: 'person', type: PersonEntity })
	@ApiResponse({ status: 200, type: PersonEntity })
	public async save(@Req() req: any, @Body() customer: PersonEntity): Promise<Execute<PersonEntity>> {
		const user: TokenPayload = req.user;
		return await this.customerService.save(user.email, customer);
	}

	@Get('car')
	@ApiResponse({ status: 200, type: CarEntity })
	public async getCars(@Req() req: any): Promise<CarEntity[]> {
		const user: TokenPayload = req.user;
		return await this.customerService.findCars(user.email);
	}

	@Get('car/:id')
	@ApiResponse({ status: 200, type: CarEntity })
	public async getCar(@Req() req: any, @Param('id') idCar: string): Promise<CarEntity> {
		const user: TokenPayload = req.user;
		return await this.customerService.findCar(user.email, idCar);
	}

	@Post('car')
	@ApiResponse({ status: 200, type: CarEntity })
	@ApiImplicitBody({ name: 'car', type: CarEntity })
	public async postCar(@Req() req: any, @Body() car: CarEntity): Promise<Execute<CarEntity>> {
		const user: TokenPayload = req.user;
		return await this.customerService.saveCar(user.email, car);
	}

	@Delete('car/:id')
	@ApiResponse({ status: 200, type: CarEntity })
	public async deleteCar(@Req() req: any, @Param('id') idCar: string): Promise<Execute<CarEntity>> {
		const user: TokenPayload = req.user;
		return await this.customerService.deleteCar(user.email, idCar);
	}

	@Get('address')
	@ApiResponse({ status: 200, type: AddressEntity })
	public async getAddresses(@Req() req: any): Promise<AddressEntity[]> {
		const user: TokenPayload = req.user;
		return await this.customerService.findAddresses(user.email);
	}

	@Get('address/:id')
	@ApiResponse({ status: 200, type: AddressEntity })
	public async getAddress(@Req() req: any, @Param('id') idCar: string): Promise<AddressEntity> {
		const user: TokenPayload = req.user;
		return await this.customerService.findAddress(user.email, idCar);
	}

	@Post('address')
	@ApiResponse({ status: 200, type: AddressEntity })
	@ApiImplicitBody({ name: 'address', type: AddressEntity })
	public async postAddress(@Req() req: any, @Body() address: AddressEntity): Promise<Execute<AddressEntity>> {
		const user: TokenPayload = req.user;
		return await this.customerService.saveAddress(user.email, address);
	}

	@Delete('address/:id')
	@ApiResponse({ status: 200, type: AddressEntity })
	public async deleteAddress(@Req() req: any, @Param('id') idAddress: string): Promise<Execute<AddressEntity>> {
		const user: TokenPayload = req.user;
		return await this.customerService.deleteAddress(user.email, idAddress);
	}

	@Get('findworkshop')
	@ApiResponse({ status: 200, type: WorkshopEntity, isArray: true })
	public async findWorkshop(@Req() req: any): Promise<WorkshopEntity[]> {
		return await this.workshopService.findAll();
	}
}
