import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '@app/service/customer.service';
import { LayoutService } from '@app/service/layout.service';

@Component({
  selector: 'app-customer-search',
  templateUrl: './customer-search.component.html',
  styleUrls: ['./customer-search.component.scss']
})
export class CustomerSearchComponent implements OnInit {

  public ready = false;

  constructor(private customer: CustomerService, private layout: LayoutService) { }

  ngOnInit() {
	this.layout.setTitle('Search');
  }

}
