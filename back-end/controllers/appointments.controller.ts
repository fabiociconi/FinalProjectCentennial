import { Get, Post, Controller, Param } from "@nestjs/common";
import { AppointmentService } from "../services/appoinment.service";
import { AppointmentEntity } from "../schemas/people.schema";

@Controller("api/appointment")
export class AppointmentController {
	constructor(private appoitService: AppointmentService) {
	}

	@Get()
	async getAll(): Promise<AppointmentEntity[]> {
		return await this.appoitService.findAll();
	}

	@Get(":id")
	async getOne(@Param() params): Promise<AppointmentEntity> {
		return await this.appoitService.find(params.id);
	}

	@Get("new")
	async save(): Promise<AppointmentEntity> {
		this.appoitService.create({
			time: "18",
			workshopName: "Nose e foda!",
			address: {
				_id: "",
				city: "Toronto",
				number: "13",
				street: "Barnabe"
			}
		});
		return null;
	}
}
