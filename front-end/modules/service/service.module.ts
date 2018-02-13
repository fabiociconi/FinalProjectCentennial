import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { XCommonModule } from "xcommon";

import { AuthInterceptor } from "./auth-interceptor.service";
import { DialogService } from "./confirm-dialog.service";
import { ConfirmDialog } from "../shared/components/confirm-dialog.component";
import { AuthService } from "./auth.service";
import { IconService } from "./icon.service";
import { CustomerService } from "./customer.service";
import { WorkshopService } from "./workshop.service";

@NgModule({
	imports: [
		CommonModule,
		HttpClientModule,
		XCommonModule
	],
	entryComponents: [
		ConfirmDialog
	],
	providers: [
		DialogService,
		AuthService,
		IconService,
		CustomerService,
		WorkshopService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true
		}
	]
})
export class ServiceModule { }