import { Component, OnInit } from '@angular/core';

import { WorkshopService } from '@app/service/workshop.service';
import { LayoutService } from '@app/service/layout.service';
import { AddressEntity } from '@app/entity';

@Component({
	selector: 'app-address-list',
	templateUrl: './address-list.component.html',
	styleUrls: ['./address-list.component.scss']
})
export class WorkshopAddressListComponent implements OnInit {

	public ready = false;
	public addresses: AddressEntity[] = [];

	constructor(private workshop: WorkshopService, private layout: LayoutService) { }

	ngOnInit() {
		this.layout.setTitle('Addresses');
		this.workshop.getAddresses().subscribe(res => {
			this.addresses = res;
			this.ready = true;
		});
	}

}
