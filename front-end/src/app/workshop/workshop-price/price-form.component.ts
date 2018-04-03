import { Component, OnInit } from '@angular/core';

import { WorkshopService } from '@app/service/workshop.service';
import { LayoutService } from '@app/service/layout.service';
import { AddressEntity } from '@app/entity';

@Component({
  selector: 'app-price-form',
  templateUrl: './price-form.component.html',
  styleUrls: ['./price-form.component.scss']
})
export class WorkshopPriceFormComponent implements OnInit {

  public ready = false;

  constructor(private workshop: WorkshopService, private layout: LayoutService) { }

  ngOnInit() {
	this.layout.setTitle('Price Table');
  }

}
