import { Get, Post, Controller, Param, Body } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";

import { ICustomerEntity, IAddressEntity } from "../../../entity";
import { CustomerService } from "../services/customer.service";

@ApiBearerAuth()
@Controller("api/customer/profile")
export class ProfilerController {
	constructor(private customerService: CustomerService) {
	}

	@Get()
	async getAll(): Promise<ICustomerEntity[]> {
		return await this.customerService.findAll();
	}

	@Get(":id")
	async getOne(@Param("id") id: string): Promise<ICustomerEntity> {
		return await this.customerService.find(id);
	}

	@Get("save")
	async save(@Body() customer: ICustomerEntity): Promise<ICustomerEntity> {
		return this.customerService.create(customer);
	}
}
