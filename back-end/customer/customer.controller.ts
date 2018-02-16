import { Get, Post, Controller, Param, Body, Req } from "@nestjs/common";
import { ApiBearerAuth, ApiUseTags, ApiResponse } from "@nestjs/swagger";

import { TokenPayload } from "../../entity";
import { PersonEntity, CarEntity, AddressEntity } from "../../entity";
import { CustomerService } from "../service/customer.service";

@ApiBearerAuth()
@ApiUseTags("customer")
@Controller("api/customer")
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
	@ApiResponse({ status: 200, type: PersonEntity })
	public async save(@Req() req: any, @Body() customer: PersonEntity): Promise<PersonEntity> {
		const user: TokenPayload = req.user;
		return this.customerService.save(user.email, customer);
	}

	@Get("car")
	@ApiResponse({ status: 200, type: CarEntity })
	public async getCars(@Req() req: any): Promise<CarEntity[]> {
		const user: TokenPayload = req.user;
		return this.customerService.findCars(user.email);
	}

	@Post("car")
	@ApiResponse({ status: 200, type: CarEntity })
	public async postCar(@Req() req: any, @Body() car: CarEntity): Promise<CarEntity> {
		const user: TokenPayload = req.user;
		return this.customerService.saveCars(user.email, car);
	}
}