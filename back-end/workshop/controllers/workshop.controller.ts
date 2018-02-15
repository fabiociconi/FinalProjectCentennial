import { Get, Post, Controller, Param, Body } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";

import { IWorkshopEntity, IAddressEntity } from "../../../entity";
import { WorkshopService } from "../services/workshop.service";

@ApiBearerAuth()
@Controller("api/workshop/profile")
export class WorkshopController {
	constructor(private workshopService: WorkshopService) {
	}

	@Get()
	async getAll(): Promise<IWorkshopEntity[]> {
		return await this.workshopService.findAll();
	}

	@Get(":id")
	async getOne(@Param("id") id: string): Promise<IWorkshopEntity> {
		return await this.workshopService.find(id);
	}

	@Get("save")
	async save(@Body() workshop: IWorkshopEntity): Promise<IWorkshopEntity> {
		return this.workshopService.create(workshop);
	}
}
