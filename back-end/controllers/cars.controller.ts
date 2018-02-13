import { Get, Post, Controller, Param } from "@nestjs/common";
import { PeopleService } from "../services/people.service";
import { PeopleEntity } from "../schemas/people.schema";

@Controller("api/cars")
export class CarsController {
	constructor(private peopleService: PeopleService) {
	}

	@Get()
	async getAll(): Promise<PeopleEntity[]> {
		return await this.peopleService.findAll();
	}

	@Get(":id")
	async getOne(@Param() params): Promise<PeopleEntity> {
		return await this.peopleService.find(params.id);
	}

	@Post()
	async save(): Promise<PeopleEntity> {
		return null;
	}
}
