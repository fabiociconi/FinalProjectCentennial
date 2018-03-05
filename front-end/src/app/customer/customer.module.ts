import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { CustomerLayoutComponent } from './customer-layout/customer-layout.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { CarListComponent } from './cutomer-car/car-list.component';
import { CarFormComponent } from './cutomer-car/car-form.component';

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		CustomerRoutingModule
	],
	declarations: [CustomerHomeComponent, CustomerLayoutComponent, CustomerProfileComponent, CarListComponent, CarFormComponent]
})
export class CustomerModule { }
