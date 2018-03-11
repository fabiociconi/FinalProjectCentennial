import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { CustomerLayoutComponent } from './customer-layout/customer-layout.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { CarListComponent } from './cutomer-car/car-list.component';
import { CarFormComponent } from './cutomer-car/car-form.component';
import { AddressListComponent } from './customer-address/address-list.component';
import { AddressFormComponent } from './customer-address/address-form.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		CustomerRoutingModule,
		SharedModule
	],
	declarations: [
		CustomerHomeComponent, 
		CustomerLayoutComponent, 
		CustomerProfileComponent, 
		CarListComponent, 
		CarFormComponent,
		AddressListComponent, 
		AddressFormComponent
	]
})
export class CustomerModule { }
