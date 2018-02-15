import { Get, Post, Controller, Param, Body } from "@nestjs/common";
import { ApiBearerAuth, ApiUseTags, ApiResponse } from "@nestjs/swagger";

import { CustomerEntity, AddressEntity } from "../../../entity";
import { CustomerService } from "../services/customer.service";

@ApiBearerAuth()
@ApiUseTags("customer")
@Controller("api/customer")
export class ProfilerController {
	constructor(private customerService: CustomerService) {
	}

	@Get()
	@ApiResponse({ status: 200, type: CustomerEntity, isArray: true })
	async getAll(): Promise<CustomerEntity[]> {
		return await this.customerService.findAll();
	}

	@Get(":id")
	@ApiResponse({ status: 200, type: CustomerEntity })
	async getOne(@Param("id") id: string): Promise<CustomerEntity> {
		return await this.customerService.find(id);
	}

	@Post()
	@ApiResponse({ status: 200, type: CustomerEntity })
	async save(@Body() customer: CustomerEntity): Promise<CustomerEntity> {
		return this.customerService.create(customer);
	}
}
