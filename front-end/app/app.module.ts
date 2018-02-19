import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CustomerModule } from './customer/customer.module';
import { PublicModule } from './public/public.module';
import { WorkshopModule } from './workshop/workshop.module';
import { ServiceModule } from './service/service.module';
import { MaterialModule } from './/material.module';


@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		CustomerModule,
		PublicModule,
		WorkshopModule,
		ServiceModule,
		MaterialModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
