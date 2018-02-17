import { Get, Post, Controller, Param, Body } from "@nestjs/common";
import { ApiBearerAuth, ApiUseTags, ApiResponse } from "@nestjs/swagger";

import { WorkshopEntity, AddressEntity } from "../../entity";
import { WorkshopService } from "../service/workshop.service";

@ApiBearerAuth()
@ApiUseTags("workshop")
@Controller("api/workshop")
export class WorkshopController {
	constructor(private workshopService: WorkshopService) {
	}

	@Get(":id")
	@ApiResponse({ status: 200, type: WorkshopEntity })
	async getOne(@Param("id") id: string): Promise<WorkshopEntity> {
		return await this.workshopService.find(id);
	}

	@Post()
	@ApiResponse({ status: 200, type: WorkshopEntity })
	async save(@Body() workshop: WorkshopEntity): Promise<WorkshopEntity> {
		return this.workshopService.create(workshop);
	}
}
