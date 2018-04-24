import { Component, OnInit } from '@angular/core';

import { CustomerService } from '@app/service/customer.service';
import { LayoutService } from '@app/service/layout.service';
import { AppointmentEntity } from '@app/entity';

@Component({
	selector: 'app-appointment-list',
	templateUrl: './appointment-list.component.html',
	styleUrls: ['./appointment-list.component.scss']
})
export class CustomerAppointmentListComponent implements OnInit {

	public appointments: AppointmentEntity[] = [];
	public ready = false;

	constructor(private customer: CustomerService, private layout: LayoutService) { }

	ngOnInit() {
		this.layout.setTitle('Appointments');
		this.customer.findAppointments().subscribe(res => {
			this.appointments = res;
		});
	}

}
