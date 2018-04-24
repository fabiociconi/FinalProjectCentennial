import { Component, OnInit } from '@angular/core';

import { CustomerService } from '@app/service/customer.service';
import { LayoutService } from '@app/service/layout.service';
import { AppointmentEntity } from '@app/entity';
import { WorkshopService } from '@app/service/workshop.service';

@Component({
	selector: 'app-appointment-list',
	templateUrl: './appointment-list.component.html',
	styleUrls: ['./appointment-list.component.scss']
})
export class WorkshopAppointmentListComponent implements OnInit {

	public appointments: AppointmentEntity[] = [];
	public ready = false;

	constructor(private workshop: WorkshopService, private layout: LayoutService) { }

	ngOnInit() {
		this.layout.setTitle('Appointments');
		this.workshop.findAppointments().subscribe(res => {
			this.appointments = res;
		});
	}

}
