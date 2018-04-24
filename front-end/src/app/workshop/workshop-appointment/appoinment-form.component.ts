import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AutoFormService, AutoForm } from 'xcommon/autoform';

import { LayoutService } from '@app/service/layout.service';
import { AddressEntity, AppointmentEntity, CarEntity } from '@app/entity';
import { MatSnackBar } from '@angular/material';
import { ConfirmModalService } from '../../shared/confirm-modal.service';
import { AuthService } from '../../service';
import { WorkshopService } from '@app/service/workshop.service';

@Component({
	selector: 'app-appoinment-form',
	templateUrl: './appoinment-form.component.html',
	styleUrls: ['./appoinment-form.component.scss']
})
export class WorkshopAppointmentFormComponent implements OnInit {

	private appointmentAutoForm: AutoForm<AppointmentEntity>;
	public id: string;
	public idWorkshop: string;
	public idAddress: string;
	public appointmentForm: FormGroup;
	public ready = false;
	public cars: CarEntity[] = [];

	constructor(
		private authService: AuthService,
		private autoForm: AutoFormService,
		private customer: WorkshopService,
		private layout: LayoutService,
		private router: Router,
		private confirmService: ConfirmModalService,
		private activatedRoute: ActivatedRoute,
		private snackBar: MatSnackBar) { }

	ngOnInit() {
		this.layout.setTitle('Appointment');

		this.activatedRoute.params.subscribe(param => {
			this.id = param.id;
			this.idWorkshop = param.workshop;
			this.idAddress = param.address;
			this.load(param.id);
		});
	}

	public save(appointment: AppointmentEntity): void {
		this.customer.saveAppointment(appointment).subscribe(res => {
			if (res.hasError) {
				this.snackBar.open('Something went strange ...', null, {
					duration: 2000
				});

				return;
			}

			this.snackBar.open('Data saved.', null, {
				duration: 2000
			});

			if (this.id !== res.entity._id) {
				this.router.navigate(['/customer/appointments/', res.entity._id]);
				return;
			}

			this.buildForm(res.entity);
		});
	}

	public delete(): void {

		this.confirmService.confirm('Deleting Appointment', 'Would you like to delete this appointment?')
			.subscribe(confirm => {

				if (!confirm) {
					return;
				}

				this.customer.deleteAddress(this.id)
					.subscribe(res => {

						if (!res.hasError) {
							this.router.navigate(['/customer/appointments']);

							this.snackBar.open('Appointment deleted', null, {
								duration: 2000
							});

							return;
						}

						this.snackBar.open('Something went strange ...', null, {
							duration: 2000
						});
					});
			});
	}

	private load(id: string): void {
		this.customer.findAppointment(id).subscribe(res => {
			this.buildForm(res);
		});
	}

	private buildForm(appointment: AppointmentEntity): void {
		this.appointmentAutoForm = this.autoForm.createNew<AppointmentEntity>();

		this.appointmentForm = this.appointmentAutoForm
			.addValidator(c => c.idCar, Validators.required)
			.build(appointment);

		this.ready = true;
	}

}
