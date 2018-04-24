import * as jwt from 'jsonwebtoken';
import { Model, Document } from 'mongoose';
import { Component } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Execute, ExecuteMessageType } from 'xcommon/entity';

import { environment } from '@app/env';
import { UserSchema, AppointmentSchema } from '@app/schema';

import { CustomerService } from '@app/service/customer.service';
import { WorkshopService } from '@app/service/workshop.service';

import { UserEntity, SingUpEntity, SingInEntity, RoleType, AppointmentEntity, ServicesEntity } from '@app/entity';
import { TokenResultEntity, TokenPayload } from '@app/entity';

@Component()
export class AppoitmentService {
	constructor(
		@InjectModel(AppointmentSchema) private appoitmentModel: Model<AppointmentEntity & Document>,
		private customerService: CustomerService,
		private workshopService: WorkshopService) { }

	public async save(entity: AppointmentEntity): Promise<Execute<AppointmentEntity>> {
		const result = new Execute<AppointmentEntity>();

		entity.services = entity.services.filter(c => c.selected === true);

		if (!entity._id) {
			const model = new this.appoitmentModel(entity);
			result.entity = await model.save();
			return result;
		}

		result.entity = await this.appoitmentModel.findByIdAndUpdate(entity._id, entity).exec();
		return result;
	}

	public async findById(id: string): Promise<AppointmentEntity> {
		const result = await this.find({ _id: id });

		if (result) {
			return result[0];
		}

		return null;
	}

	public async findByCustomer(idCustomer: string): Promise<AppointmentEntity[]> {
		return await this.find({ idPerson: idCustomer });
	}

	public async findByWorkshop(idWorkshop: string): Promise<AppointmentEntity[]> {
		return await this.find({ idworkshop: idWorkshop });
	}

	private async find(filter: any): Promise<AppointmentEntity[]> {

		const result = await this.appoitmentModel.find(filter).exec();

		for (let i = 0; i < result.length; i++) {
			const item = result[i];
			const workshop = await this.workshopService.find(item.idworkshop, item.idAddress);

			for (let x = 0; x < item.services.length; x++) {
				item.services[x].selected = true;
			}

			item.person = await this.customerService.find(item.idPerson);
			item.workshop = workshop.company;
			item.car = await this.customerService.findCar(item.idPerson, item.idCar);
			item.address = workshop.address[0];
		}

		return result;
	}
}
