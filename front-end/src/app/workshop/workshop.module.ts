import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkshopRoutingModule } from './workshop-routing.module';
import { WorkshopLayoutComponent } from './workshop-layout/workshop-layout.component';
import { WorkshopHomeComponent } from './workshop-home/workshop-home.component';
import { WorkshopAddressFormComponent } from './workshop-address/address-form.component';
import { WorkshopAddressListComponent } from './workshop-address/address-list.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		WorkshopRoutingModule,
		SharedModule
	],
	declarations: [
		WorkshopLayoutComponent,
		WorkshopHomeComponent,
		WorkshopAddressListComponent,
		WorkshopAddressFormComponent
	]
})
export class WorkshopModule { }
