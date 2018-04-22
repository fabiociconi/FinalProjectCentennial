import { Component, OnInit } from '@angular/core';

import { WorkshopService } from '@app/service/workshop.service';
import { LayoutService } from '@app/service/layout.service';
import { AddressEntity, ServicesEntity, WorkshopPriceTableEntity } from '@app/entity';
import { AutoForm, AutoFormService } from 'xcommon/autoform';
import { FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { ConfirmModalService } from '../../shared/confirm-modal.service';

@Component({
	selector: 'app-price-form',
	templateUrl: './price-form.component.html',
	styleUrls: ['./price-form.component.scss']
})
export class WorkshopPriceFormComponent implements OnInit {

	public Services: ServicesEntity[] = [];
	private priceTableAutoForm: AutoForm<WorkshopPriceTableEntity>;
	public id: string;
	public priceTableForm: FormGroup;
	public ready = false;
	public priceTable: WorkshopPriceTableEntity;


	constructor(
		private autoForm: AutoFormService,
		private workshop: WorkshopService,
		private layout: LayoutService,
		private router: Router,
		private confirmService: ConfirmModalService,
		private activatedRoute: ActivatedRoute,
		private snackBar: MatSnackBar) { }

	ngOnInit() {
		this.layout.setTitle('Price Table');

		this.workshop.getServices().subscribe(res => {
			this.Services = res;
		});

		this.activatedRoute.params.subscribe(param => {
			this.id = param.id;
			this.load(param.id);
		});
	}

	public save(priceTable: WorkshopPriceTableEntity): void {
		this.workshop.savePriceTable(priceTable).subscribe(res => {
			if (res.hasError) {
				this.snackBar.open('Something went strange ...', null, {
					duration: 2000
				});

				return;
			}

			this.snackBar.open('Data saved.', null, {
				duration: 2000
			});

			if (this.id !== res.entity.id.toString()) {
				this.router.navigate(['/workshop/price', res.entity.id]);
				return;
			}

			this.buildForm(res.entity);
		});
	}

	public delete(): void {

		this.confirmService.confirm('Deleting Price', 'Would you like to delete this price?')
			.subscribe(confirm => {

				if (!confirm) {
					return;
				}

				this.workshop.deletePriceTable(this.id)
					.subscribe(res => {

						if (!res.hasError) {
							this.router.navigate(['/workshop/price']);

							this.snackBar.open('Address deleted', null, {
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

	public onChange(id: string) {
		const item = this.Services.find(c => c.id === parseInt(id, 0));
		this.priceTableForm.get('id').setValue(item.id);
		this.priceTableForm.get('name').setValue(item.name);
		this.priceTableForm.get('description').setValue(item.description);
	}

	private load(id: string): void {
		if (id === 'new') {
			this.buildForm(
				{
					id: -1,
					description: '',
					name: '',
					price: 0
				}
			);

			return;
		}

		this.workshop.getPriceTable(id).subscribe(res => {
			this.buildForm(res);
		});
	}

	private buildForm(priceTable: WorkshopPriceTableEntity): void {
		this.priceTableAutoForm = this.autoForm.createNew<WorkshopPriceTableEntity>();

		this.priceTableForm = this.priceTableAutoForm
			.addValidator(c => c.price, Validators.required)
			.build(priceTable);

		this.priceTable = priceTable;
		this.ready = true;
	}

}
