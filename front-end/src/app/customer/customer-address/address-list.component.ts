import { Component, OnInit } from '@angular/core';

import { CustomerService } from '@app/service/customer.service';
import { LayoutService } from '@app/service/layout.service';
import { AddressEntity } from '@app/entity';

@Component({
	selector: 'app-address-list',
	templateUrl: './address-list.component.html',
	styleUrls: ['./address-list.component.scss']
})
export class AddressListComponent implements OnInit {

	public ready = false;
	public addresses: AddressEntity[] = [];

	constructor(private customer: CustomerService, private layout: LayoutService) { }

	ngOnInit() {
		this.layout.setTitle('Addresses');
		this.customer.getAddresses().subscribe(res => {
			this.addresses = res;
			this.ready = true;
		});
	}

}
