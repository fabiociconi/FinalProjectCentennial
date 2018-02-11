import { Get, Controller } from "@nestjs/common";
import { PeopleService } from "../services/people.service";
import { PeopleEntity } from "../schemas/people.schema";

@Controller("api/people")
export class PeopleController {
	constructor(private peopleService: PeopleService) {

	}

	@Get()
	async getAll(): Promise<PeopleEntity[]> {
		return await this.peopleService.findB("marvio.bezerra@gmail.com");
	}

	@Get("one")
	async getOne(): Promise<PeopleEntity> {
		return await this.peopleService.find("marvio.bezerra@gmail.com");
	}

	@Get("onex")
	getOneX(): PeopleEntity {
		return {
			_id: "marvio.bezerra@gmail.com",
			age: 37,
			name: "Marvio",
			breed: "April",
			address: [{
				_id: null,
				city: "Paris",
				number: "3",
				street: "Jack"
			}]
		};
	}

	@Get("new")
	create(): string {
		this.peopleService.create({
			_id: "marvio.bezerra@gmail.com",
			age: 37,
			name: "Marvio",
			breed: "April",
			address: [{
				_id: null,
				city: "Paris",
				number: "3",
				street: "Jack"
			}]
		});
		return "OK";
	}
}
