import { Component, OnInit } from '@angular/core';
import { WorkshopService } from '@app/service/workshop.service';
import { PersonEntity, CompanyEntity, WorkshopEntity } from '@app/entity';
import { FormGroup, Validators } from '@angular/forms';
import { AutoFormService, AutoForm } from 'xcommon/autoform';
import { MatSnackBar } from '@angular/material';
import { LayoutService } from '@app/service/layout.service';

@Component({
	selector: 'app-workshop-profile',
	templateUrl: './workshop-profile.component.html',
	styleUrls: ['./workshop-profile.component.scss']
})

export class WorkshopProfileComponent implements OnInit {

	public workshopForm: FormGroup;
	public ready = false;
	private workshopAutoForm: AutoForm<CompanyEntity>;

	constructor(
		private layout: LayoutService,
		private workshop: WorkshopService,
		private autoForm: AutoFormService,
		private snackBar: MatSnackBar) { }

	ngOnInit() {
		this.layout.setTitle('Profile');
		this.workshop.getProfile().subscribe(res => this.buildForm(res.company));
	}

	public save(entity: CompanyEntity): void {
		this.workshop.saveProfile(entity)
			.subscribe(res => {
				if (res.hasError) {
					this.snackBar.open('Something went strange ...', null, {
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

	private buildForm(entity: CompanyEntity): void {
		this.workshopAutoForm = this.autoForm.createNew<CompanyEntity>();

		this.workshopForm = this.workshopAutoForm
			.addValidator(c => c.comertialName, Validators.required)
			.addValidator(c => c.legalName, Validators.required)
			.addValidator(c => c.phone, Validators.required)
			.build(entity);

		this.ready = true;
	}
}
