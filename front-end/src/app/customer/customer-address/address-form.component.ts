import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AutoFormService, AutoForm } from 'xcommon/autoform';

import { CustomerService } from '@app/service/customer.service';
import { LayoutService } from '@app/service/layout.service';
import { AddressEntity } from '@app/entity';
import { MatSnackBar } from '@angular/material';

@Component({
	selector: 'app-address-form',
	templateUrl: './address-form.component.html',
	styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit {

	private addressAutoForm: AutoForm<AddressEntity>;
	public id: string;
	public addressForm: FormGroup;
	public ready = false;
	public address: AddressEntity;

	constructor(
		private autoForm: AutoFormService,
		private customer: CustomerService,
		private layout: LayoutService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private snackBar: MatSnackBar) { }

	ngOnInit() {
		this.layout.setTitle('Addresses');

		this.activatedRoute.params.subscribe(param => {
			this.id = param.id;
			this.load(param.id);
		});
	}

	public save(address: AddressEntity): void {
		this.customer.saveAddress(address).subscribe(res => {
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
				this.router.navigate(['/customer/address', res.entity._id]);
				return;
			}

			this.buildForm(res.entity);
		});
	}

	public delete(): void {
		this.customer.deleteAddress(this.id)
			.subscribe(res => {
				console.log(res);
			});
	}

	private load(id: string): void {
		if (id === 'new') {
			this.buildForm({
				street: '',
				number: '',
				city: '',
				province: '',
				country: '',
				postalcode: '',
				Latitude: 0,
				Longitude: 0
			});
			return;
		}

		this.customer.getAddress(id).subscribe(res => {
			this.buildForm(res);
		});
	}

	private buildForm(address: AddressEntity): void {
		this.addressAutoForm = this.autoForm.createNew<AddressEntity>();

		this.addressForm = this.addressAutoForm
			.addValidator(c => c.street, Validators.required)
			.addValidator(c => c.number, Validators.required)
			.addValidator(c => c.city, Validators.required)
			.addValidator(c => c.province, Validators.required)
			.addValidator(c => c.country, Validators.required)
			.addValidator(c => c.postalcode, Validators.required)
			.build(address);
		
		this.address = address;
		this.ready = true;
	}
}
