import { Component, OnInit, Input } from '@angular/core';
import { WorkshopEntity, AddressEntity } from '@app/entity';

@Component({
	selector: 'app-customer-search-popup',
	templateUrl: './customer-search-popup.component.html',
	styleUrls: ['./customer-search-popup.component.scss']
})
export class CustomerSearchPopupComponent implements OnInit {

	@Input()
	public workshop: WorkshopEntity;

	@Input()
	public address: AddressEntity;

	constructor() { }

	ngOnInit() {
	}

}
