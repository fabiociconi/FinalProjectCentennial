import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { WorkshopRoutingModule } from './workshop-routing.module';
import { WorkshopLayoutComponent } from './workshop-layout/workshop-layout.component';
import { WorkshopHomeComponent } from './workshop-home/workshop-home.component';
import { WorkshopAddressFormComponent } from './workshop-address/address-form.component';
import { WorkshopAddressListComponent } from './workshop-address/address-list.component';
import { SharedModule } from '../shared/shared.module';
import { WorkshopProfileComponent } from './workshop-profile/workshop-profile.component';
import { WorkshopPriceFormComponent } from './workshop-price/price-form.component';
import { WorkshopPriceListComponent } from './workshop-price/price-list.component';
import { WorkshopAppointmentListComponent } from './workshop-appointment/appointment-list.component';

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
		WorkshopAddressFormComponent,
		WorkshopProfileComponent,
		WorkshopPriceListComponent,
		WorkshopPriceFormComponent,
		WorkshopAppointmentListComponent
	]
})
export class WorkshopModule { }
