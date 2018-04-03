import { Component, OnInit } from '@angular/core';

import { CustomerService } from '@app/service/customer.service';
import { LayoutService } from '@app/service/layout.service';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss']
})
export class WorkshopAppointmentListComponent implements OnInit {

  public ready = false;

  constructor(private customer: CustomerService, private layout: LayoutService) { }

  ngOnInit() {
	this.layout.setTitle('Appointments');
  }

}
