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
		WorkshopProfileComponent
	]
})
export class WorkshopModule { }
