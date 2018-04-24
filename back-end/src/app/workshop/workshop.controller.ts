import { Req, Get, Post, Delete, Controller, Param, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiImplicitBody } from '@nestjs/swagger';

import { WorkshopEntity, AddressEntity, TokenPayload, CompanyEntity, ServicesEntity, WorkshopPriceTableEntity, AppointmentEntity } from '../../../../entity';
import { WorkshopService } from '../service/workshop.service';
import { Execute } from 'xcommon/entity';
import { AppoitmentService } from '@app/service/appointment.service';
import { Query } from 'mongoose';

@ApiBearerAuth()
@ApiUseTags('workshop')
@Controller('api/workshop')
export class WorkshopController {
	constructor(private workshopService: WorkshopService, private appointmentService: AppoitmentService) {
	}

	@Get()
	@ApiResponse({ status: 200, type: CompanyEntity })
	public async get(@Req() req: any): Promise<CompanyEntity> {
		const user: TokenPayload = req.user;
		return await this.workshopService.find(user.email);
	}

	@Post()
	@ApiResponse({ status: 200, type: CompanyEntity })
	async save(@Req() req: any, @Body() workshop: CompanyEntity): Promise<Execute<CompanyEntity>> {
		const user: TokenPayload = req.user;
		return this.workshopService.save(user.email, workshop);
	}

	@Get('address')
	@ApiResponse({ status: 200, type: AddressEntity })
	public async getAddresses(@Req() req: any): Promise<AddressEntity[]> {
		const user: TokenPayload = req.user;
		return await this.workshopService.findAddresses(user.email);
	}

	@Get('services')
	@ApiResponse({ status: 200, type: ServicesEntity, isArray: true })
	public getServives(): ServicesEntity[] {
		return this.workshopService.getServicesDefault();
	}

	@Get('address/:id')
	@ApiResponse({ status: 200, type: AddressEntity })
	public async getAddress(@Req() req: any, @Param('id') idCar: string): Promise<AddressEntity> {
		const user: TokenPayload = req.user;
		return await this.workshopService.findAddress(user.email, idCar);
	}

	@Post('address')
	@ApiResponse({ status: 200, type: AddressEntity })
	@ApiImplicitBody({ name: 'address', type: AddressEntity })
	public async postAddress(@Req() req: any, @Body() address: AddressEntity): Promise<Execute<AddressEntity>> {
		const user: TokenPayload = req.user;
		return await this.workshopService.saveAddress(user.email, address);
	}

	@Delete('address/:id')
	@ApiResponse({ status: 200, type: AddressEntity })
	public async deleteAddress(@Req() req: any, @Param('id') idAddress: string): Promise<Execute<AddressEntity>> {
		const user: TokenPayload = req.user;
		return await this.workshopService.deleteAddress(user.email, idAddress);
	}

	@Get('pricetable')
	@ApiResponse({ status: 200, type: WorkshopPriceTableEntity })
	public async getPricesTable(@Req() req: any): Promise<WorkshopPriceTableEntity[]> {
		const user: TokenPayload = req.user;
		return await this.workshopService.findPricesTable(user.email);
	}

	@Get('pricetable/:id')
	@ApiResponse({ status: 200, type: WorkshopPriceTableEntity })
	public async getPriceTable(@Req() req: any, @Param('id') id: number): Promise<WorkshopPriceTableEntity> {
		const user: TokenPayload = req.user;
		return await this.workshopService.findPriceTable(user.email, id);
	}

	@Post('pricetable')
	@ApiResponse({ status: 200, type: WorkshopPriceTableEntity })
	@ApiImplicitBody({ name: 'address', type: WorkshopPriceTableEntity })
	public async postPriceTable(@Req() req: any, @Body() priceTable: WorkshopPriceTableEntity): Promise<Execute<WorkshopPriceTableEntity>> {
		const user: TokenPayload = req.user;
		return await this.workshopService.savePriceTable(user.email, priceTable);
	}

	@Delete('pricetable/:id')
	@ApiResponse({ status: 200, type: WorkshopPriceTableEntity })
	public async deletePriceTable(@Req() req: any, @Param('id') idAddress: number): Promise<Execute<WorkshopPriceTableEntity>> {
		const user: TokenPayload = req.user;
		return await this.workshopService.deletePriceTable(user.email, idAddress);
	}

	@Get('appoitment')
	@ApiResponse({ status: 200, type: WorkshopEntity, isArray: true })
	public async getAppointments(@Req() req: any): Promise<AppointmentEntity[]> {
		const user: TokenPayload = req.user;
		return this.parseList(await this.appointmentService.findByWorkshop(user.email));
	}

	@Get('appoitment/:id')
	@ApiResponse({ status: 200, type: WorkshopEntity, isArray: true })
	public async getAppointment(@Req() req: any, @Param('id') id: string): Promise<AppointmentEntity> {
		const user: TokenPayload = req.user;
		return this.parse(await this.appointmentService.findById(id));
	}

	@Post('appoitment')
	@ApiResponse({ status: 200, type: WorkshopEntity, isArray: true })
	public async saveAppointment(@Req() req: any, @Body() entity: AppointmentEntity): Promise<Execute<AppointmentEntity>> {
		return await this.appointmentService.save(entity);
	}

	private parseList(entity: any[]): AppointmentEntity[] {
		const result: AppointmentEntity[] = [];
		entity.forEach(res => result.push(this.parse(res)));
		return result;
	}

	private parse(entity: any): AppointmentEntity {
		const a: AppointmentEntity = {
			__v: entity.__v,
			_id: entity._id,
			createdAt: entity.createdAt,
			updatedAt: entity.updatedAt,
			idPerson: entity.idPerson,
			idworkshop: entity.idworkshop,
			idAddress: entity.idAddress,
			idCar: entity.idCar,
			status: entity.status,
			person: entity.person,
			workshop: entity.workshop,
			address: entity.address,
			car: entity.car,
			services: entity.services
		};
		return a;
	}
}
