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
		return await this.peopleService.find("marvio.bezerra@gmail.com");
	}

	@Get("new")
	create(): string {
		this.peopleService.create({ _id: "fabiocicone@msn.com", age: 5, name: "Fabio", breed: "May" });
		return "OK";
	}
}
