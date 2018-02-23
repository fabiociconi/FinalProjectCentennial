import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PublicModule } from './public/public.module';
import { ServiceModule } from './service/service.module';


@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		PublicModule,
		ServiceModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
