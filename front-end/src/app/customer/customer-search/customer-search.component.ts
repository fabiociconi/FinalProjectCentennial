import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '@app/service/customer.service';
import { LayoutService } from '@app/service/layout.service';
import { AddressEntity, WorkshopEntity } from '@app/entity';
import { WorkshopService } from '@app/service/workshop.service';

@Component({
	selector: 'app-customer-search',
	templateUrl: './customer-search.component.html',
	styleUrls: ['./customer-search.component.scss']
})
export class CustomerSearchComponent implements OnInit {

	public ready = false;
	public addresses: AddressEntity[] = [];
	public latitude = 43.642509;
	public longitude = -79.387039;
	public workshops: WorkshopEntity[] = [];

	constructor(
		private customerService: CustomerService,
		private layout: LayoutService) { }

	ngOnInit() {
		this.layout.setTitle('Search');

		this.customerService.findworkshop()
			.subscribe(res => this.workshops = res);

		this.customerService.getAddresses()
			.subscribe(res => {
				this.addresses = res;
			});
	}

	public setLocation(id: string): void {

		if (id === '-1') {
			return;
		}

		const address = this.addresses.find(c => c._id === id);
		this.longitude = address.Longitude;
		this.latitude = address.Latitude;
	}
}
