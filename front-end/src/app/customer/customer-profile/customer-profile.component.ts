import { Component, OnInit } from '@angular/core';
import { CustomerService } from '@app/service/customer.service';
import { PersonEntity } from '@app/entity';
import { FormGroup, Validators } from '@angular/forms';
import { AutoFormService, AutoForm } from 'xcommon/autoform';
import { MatSnackBar } from '@angular/material';
import { LayoutService } from '@app/service/layout.service';

@Component({
	selector: 'app-customer-profile',
	templateUrl: './customer-profile.component.html',
	styleUrls: ['./customer-profile.component.scss']
})

export class CustomerProfileComponent implements OnInit {

	public customerForm: FormGroup;
	public ready = false;
	private customerAutoForm: AutoForm<PersonEntity>;

	constructor(
		private layout: LayoutService,
		private customer: CustomerService,
		private autoForm: AutoFormService,
		private snackBar: MatSnackBar) { }

	ngOnInit() {
		this.layout.setTitle('Profile');
		this.customer.getProfile().subscribe(res => this.buildForm(res));
	}

	public save(entity: PersonEntity): void {
		this.customer.saveProfile(entity)
			.subscribe(res => {
				if (res.hasError) {
					this.snackBar.open('Something went strnage ...', null, {
						duration: 2000
					});

					return;
				}

				this.snackBar.open('Data saved.', null, {
					duration: 2000
				});

				this.buildForm(res.entity);
			});
	}

	private buildForm(entity: PersonEntity): void {
		this.customerAutoForm = this.autoForm.createNew<PersonEntity>();

		this.customerForm = this.customerAutoForm
			.addValidator(c => c.firstName, Validators.required)
			.addValidator(c => c.lastName, Validators.required)
			.addValidator(c => c.email, Validators.required)
			.disableControl(c => c.email)
			.build(entity);

		this.ready = true;
	}
}
