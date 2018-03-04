import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AuthService } from './auth.service';
import { RouterModule } from '@angular/router';
import { CustomerService } from './customer.service';

@NgModule({
	imports: [
		CommonModule,
		HttpClientModule,
		RouterModule
	],
	declarations: [],
	providers: [AuthService, CustomerService]
})
export class ServiceModule { }
