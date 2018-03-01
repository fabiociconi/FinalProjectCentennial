import { Get, Post, Controller, Param, Body, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiImplicitBody } from '@nestjs/swagger';

import { TokenPayload, PersonEntity, CarEntity, AddressEntity } from '@app/entity';
import { CustomerService } from '@app/service/customer.service';

@ApiBearerAuth()
@ApiUseTags('customer')
@Controller('api/customer')
export class ProfilerController {
	constructor(private customerService: CustomerService) {
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
	public async save(@Req() req: any, @Body() customer: PersonEntity): Promise<PersonEntity> {
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
	public async postCar(@Req() req: any, @Body() car: CarEntity): Promise<CarEntity> {
		const user: TokenPayload = req.user;
		return await this.customerService.saveCar(user.email, car);
	}
}
