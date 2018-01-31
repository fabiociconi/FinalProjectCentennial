import { Get, Controller } from "@nestjs/common";
import { PeopleService } from "../services/people.service";
import { IPeople } from "../schemas/people.schema";

@Controller("api/people")
export class PeopleController {
	constructor(private peopleService: PeopleService) {

	}

	@Get()
	async getAll(): Promise<IPeople[]> {
		return await this.peopleService.findAll();
	}

	@Get("one")
	async getOne(): Promise<IPeople> {
		return await this.peopleService.find();
	}

	@Get("new")
	create(): string {
		this.peopleService.create({ age: 10, name: "Marvio", breed: "Teste" });
		return "OK";
	}
}
