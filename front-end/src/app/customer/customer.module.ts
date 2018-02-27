import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { CustomerLayoutComponent } from './customer-layout/customer-layout.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';

@NgModule({
	imports: [
		CommonModule,
		CustomerRoutingModule
	],
	declarations: [CustomerHomeComponent, CustomerLayoutComponent, CustomerProfileComponent]
})
export class CustomerModule { }
