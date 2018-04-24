import { Get, Post, Controller, Param, Body, Req, UseGuards, Delete, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiImplicitBody } from '@nestjs/swagger';

import { TokenPayload, PersonEntity, CarEntity, AddressEntity, RoleType, WorkshopEntity, SearchFilter, AppointmentEntity, CompanyEntity } from '@app/entity';
import { CustomerService } from '@app/service/customer.service';
import { RolesGuard, Roles } from '@app/guards';
import { Execute } from 'xcommon/entity';
import { WorkshopService } from '../service';
import { AppoitmentService } from '@app/service/appointment.service';

@ApiBearerAuth()
@ApiUseTags('customer')
@Roles(RoleType.Customer)
@Controller('api/customer')
export class ProfilerController {
	constructor(
		private customerService: CustomerService,
		private workshopService: WorkshopService,
		private appointmentService: AppoitmentService) {
	}

	@Get()
	@ApiResponse({ status: 200, type: PersonEntity })
	public async get(@Req() req: any): Promise<PersonEntity> {
		const user: TokenPayload = req.user;
		return await this.customerService.find(user.email);
	}

	@Post()
	@ApiImplicitBody({ name: 'person', type: PersonEntity })
	@ApiResponse({ status: 200, type: PersonEntity })
	public async save(@Req() req: any, @Body() customer: PersonEntity): Promise<Execute<PersonEntity>> {
		const user: TokenPayload = req.user;
		return await this.customerService.save(user.email, customer);
	}

	@Get('car')
	@ApiResponse({ status: 200, type: CarEntity })
	public async getCars(@Req() req: any): Promise<CarEntity[]> {
		const user: TokenPayload = req.user;
		return await this.customerService.findCars(user.email);
	}

	@Get('car/:id')
	@ApiResponse({ status: 200, type: CarEntity })
	public async getCar(@Req() req: any, @Param('id') idCar: string): Promise<CarEntity> {
		const user: TokenPayload = req.user;
		return await this.customerService.findCar(user.email, idCar);
	}

	@Post('car')
	@ApiResponse({ status: 200, type: CarEntity })
	@ApiImplicitBody({ name: 'car', type: CarEntity })
	public async postCar(@Req() req: any, @Body() car: CarEntity): Promise<Execute<CarEntity>> {
		const user: TokenPayload = req.user;
		return await this.customerService.saveCar(user.email, car);
	}

	@Delete('car/:id')
	@ApiResponse({ status: 200, type: CarEntity })
	public async deleteCar(@Req() req: any, @Param('id') idCar: string): Promise<Execute<CarEntity>> {
		const user: TokenPayload = req.user;
		return await this.customerService.deleteCar(user.email, idCar);
	}

	@Get('address')
	@ApiResponse({ status: 200, type: AddressEntity })
	public async getAddresses(@Req() req: any): Promise<AddressEntity[]> {
		const user: TokenPayload = req.user;
		return await this.customerService.findAddresses(user.email);
	}

	@Get('address/:id')
	@ApiResponse({ status: 200, type: AddressEntity })
	public async getAddress(@Req() req: any, @Param('id') idCar: string): Promise<AddressEntity> {
		const user: TokenPayload = req.user;
		return await this.customerService.findAddress(user.email, idCar);
	}

	@Post('address')
	@ApiResponse({ status: 200, type: AddressEntity })
	@ApiImplicitBody({ name: 'address', type: AddressEntity })
	public async postAddress(@Req() req: any, @Body() address: AddressEntity): Promise<Execute<AddressEntity>> {
		const user: TokenPayload = req.user;
		return await this.customerService.saveAddress(user.email, address);
	}

	@Delete('address/:id')
	@ApiResponse({ status: 200, type: AddressEntity })
	public async deleteAddress(@Req() req: any, @Param('id') idAddress: string): Promise<Execute<AddressEntity>> {
		const user: TokenPayload = req.user;
		return await this.customerService.deleteAddress(user.email, idAddress);
	}

	@Post('findworkshop')
	@ApiResponse({ status: 200, type: WorkshopEntity, isArray: true })
	public async findWorkshop(@Body() filter: SearchFilter): Promise<WorkshopEntity[]> {
		return await this.workshopService.findAll(filter);
	}

	@Get('findworkshop/:id/:idaddress')
	@ApiResponse({ status: 200, type: WorkshopEntity })
	public async findWorkshopById(@Param('id') id: string, @Param('idaddress') idaddress: string): Promise<WorkshopEntity> {
		const x = id;
		return await this.workshopService.find(id, idaddress);
	}

	@Get('appoitment')
	@ApiResponse({ status: 200, type: WorkshopEntity, isArray: true })
	public async getAppointments(@Req() req: any): Promise<AppointmentEntity[]> {
		const user: TokenPayload = req.user;
		return this.parseList(await this.appointmentService.findByCustomer(user.email));
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
