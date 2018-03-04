import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PublicModule } from './public/public.module';
import { ServiceModule } from './service/service.module';
import { CustomerGuard } from './guard/customer.guard';
import { WorkshopGuard } from './guard/workshop.guard';
import { AuthInterceptor } from './guard/http-interceptor.service';


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
	providers: [
		CustomerGuard,
		WorkshopGuard,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
