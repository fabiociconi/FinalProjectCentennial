import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '@app/service/customer.service';
import { LayoutService } from '@app/service/layout.service';
import { AddressEntity, WorkshopEntity, SearchFilter } from '@app/entity';
import { WorkshopService } from '@app/service/workshop.service';

@Component({
	selector: 'app-customer-search',
	templateUrl: './customer-search.component.html',
	styleUrls: ['./customer-search.component.scss']
})
export class CustomerSearchComponent implements OnInit {

	public ready = false;
	public addresses: AddressEntity[] = [];
	public workshops: WorkshopEntity[] = [];
	public filter: SearchFilter = {
		distance: 50,
		latitude: 43.642509,
		longitude: -79.387039,
		services: []
	};

	constructor(
		private customerService: CustomerService,
		private layout: LayoutService) { }

	ngOnInit() {
		this.layout.setTitle('Search');

		this.customerService.findworkshop(this.filter)
			.subscribe(res => this.workshops = res);

		this.customerService.getAddresses()
			.subscribe(res => {
				this.addresses = res;
			});
	}

	public Search(): void {
		this.customerService.findworkshop(this.filter)
			.subscribe(res => this.workshops = res);
	}

	public setLocation(id: string): void {

		if (id === '-1') {
			return;
		}

		const address = this.addresses.find(c => c._id === id);
		this.filter.longitude = address.Longitude;
		this.filter.latitude = address.Latitude;
	}
}
