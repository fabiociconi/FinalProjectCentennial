import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerHomeComponent } from './customer-home/customer-home.component';

@NgModule({
	imports: [
		CommonModule,
		CustomerRoutingModule
	],
	declarations: [CustomerHomeComponent]
})
export class CustomerModule { }
