import { Component, OnInit } from '@angular/core';

import { WorkshopService } from '@app/service/workshop.service';
import { LayoutService } from '@app/service/layout.service';
import { AddressEntity, WorkshopPriceTableEntity } from '@app/entity';

@Component({
	selector: 'app-price-list',
	templateUrl: './price-list.component.html',
	styleUrls: ['./price-list.component.scss']
})
export class WorkshopPriceListComponent implements OnInit {

	public prices: WorkshopPriceTableEntity[] = [];
	public ready = false;

	constructor(private workshop: WorkshopService, private layout: LayoutService) { }

	ngOnInit() {
		this.layout.setTitle('Price Table');
		this.workshop.getPricesTable().subscribe(res => {
			this.prices = res;
		});
	}

}
