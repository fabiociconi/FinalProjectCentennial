import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

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
import { WorkshopAppointmentFormComponent } from './workshop-appointment/appoinment-form.component';
import { MaterialModule } from '../material.module';

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MaterialModule,
		FormsModule,
		SharedModule,
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
		WorkshopAppointmentListComponent,
		WorkshopAppointmentFormComponent
	]
})
export class WorkshopModule { }
