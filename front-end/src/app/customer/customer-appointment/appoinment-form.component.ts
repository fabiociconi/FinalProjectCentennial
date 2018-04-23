import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AutoFormService, AutoForm } from 'xcommon/autoform';

import { CustomerService } from '@app/service/customer.service';
import { LayoutService } from '@app/service/layout.service';
import { AddressEntity } from '@app/entity';
import { MatSnackBar } from '@angular/material';
import { ConfirmModalService } from '../../shared/confirm-modal.service';

@Component({
	selector: 'app-appoinment-form',
	templateUrl: './appoinment-form.component.html',
	styleUrls: ['./appoinment-form.component.scss']
})
export class AppoinmentFormComponent implements OnInit {

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
		private confirmService: ConfirmModalService,
		private activatedRoute: ActivatedRoute,
		private snackBar: MatSnackBar) { }

	ngOnInit() {
		this.layout.setTitle('New Appointment');

		this.activatedRoute.params.subscribe(param => {
			this.id = param.id;
			this.load(param.id);
		});
	}


}
