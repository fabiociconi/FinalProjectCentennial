import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AutoFormService, AutoForm } from 'xcommon/autoform';

import { CustomerService } from '@app/service/customer.service';
import { LayoutService } from '@app/service/layout.service';
import { CarEntity } from '@app/entity';
import { MatSnackBar } from '@angular/material';

@Component({
	selector: 'app-car-form',
	templateUrl: './car-form.component.html',
	styleUrls: ['./car-form.component.scss']
})
export class CarFormComponent implements OnInit {

	private carAutoForm: AutoForm<CarEntity>;
	public id: string;
	public carForm: FormGroup;
	public ready = false;

	constructor(
		private autoForm: AutoFormService,
		private customer: CustomerService,
		private layout: LayoutService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private snackBar: MatSnackBar) { }

	ngOnInit() {
		this.layout.setTitle('Car');

		this.activatedRoute.params.subscribe(param => {
			this.id = param.id;
			this.load(param.id);
		});
	}

	public save(car: CarEntity): void {
		this.customer.saveCar(car).subscribe(res => {
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
				this.router.navigate(['/customer/car', res.entity._id]);
				return;
			}

			this.buildForm(res.entity);
		});
	}

	public delete(): void {
		this.customer.deleteCar(this.id)
			.subscribe(res => {
				console.log(res);
			});
	}

	private load(id: string): void {
		if (id === 'new') {
			this.buildForm({
				licencePlate: '',
				brand: '',
				color: '',
				model: ''
			});
			return;
		}

		this.customer.getCar(id).subscribe(res => {
			this.buildForm(res);
		});
	}

	private buildForm(car: CarEntity): void {
		this.carAutoForm = this.autoForm.createNew<CarEntity>();

		this.carForm = this.carAutoForm
			.addValidator(c => c.brand, Validators.required)
			.addValidator(c => c.color, Validators.required)
			.addValidator(c => c.licencePlate, Validators.required)
			.addValidator(c => c.model, Validators.required)
			.build(car);

		this.ready = true;
	}
}
