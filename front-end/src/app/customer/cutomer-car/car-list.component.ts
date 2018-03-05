import { Component, OnInit } from '@angular/core';

import { CustomerService } from '@app/service/customer.service';
import { LayoutService } from '@app/service/layout.service';
import { CarEntity } from '@app/entity';

@Component({
	selector: 'app-car-list',
	templateUrl: './car-list.component.html',
	styleUrls: ['./car-list.component.scss']
})
export class CarListComponent implements OnInit {

	public ready = false;
	public cars: CarEntity[] = [];

	constructor(private customer: CustomerService, private layout: LayoutService) { }

	ngOnInit() {
		this.layout.setTitle('Cars');
		this.customer.getCars().subscribe(res => {
			this.cars = res;
			this.ready = true;
		});
	}

}
