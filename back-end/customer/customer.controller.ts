import { Get, Post, Controller, Param, Body, Req } from "@nestjs/common";
import { ApiBearerAuth, ApiUseTags, ApiResponse } from "@nestjs/swagger";

import { CustomerEntity, AddressEntity, TokenPayload } from "../../entity";
import { CustomerService } from "../service/customer.service";

@ApiBearerAuth()
@ApiUseTags("customer")
@Controller("api/customer")
export class ProfilerController {
	constructor(private customerService: CustomerService) {
	}

	@Get()
	@ApiResponse({ status: 200, type: CustomerEntity })
	async getOne(@Req() req: any): Promise<CustomerEntity> {
		const user: TokenPayload = req.user;
		return await this.customerService.find(user.email);
	}

	@Post()
	@ApiResponse({ status: 200, type: CustomerEntity })
	async save(@Body() customer: CustomerEntity): Promise<CustomerEntity> {
		return this.customerService.create(customer);
	}
}
