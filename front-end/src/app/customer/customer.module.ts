import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { CustomerLayoutComponent } from './customer-layout/customer-layout.component';

@NgModule({
	imports: [
		CommonModule,
		CustomerRoutingModule
	],
	declarations: [CustomerHomeComponent, CustomerLayoutComponent]
})
export class CustomerModule { }
