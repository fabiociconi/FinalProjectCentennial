import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { CustomFormsModule  } from "ng2-validation";
import { XCommonAutoFormModule, XCommonModule  } from "xcommon";

import { AppRouteModule } from "./route";
import { AdminModule } from "./admin";
import { PublicModule } from "./public";
import { WorkshopModule } from "./workshop";
import { CustomerModule } from "./customer";
import { ServiceModule } from "./service";
import { MaterialModule, SharedModule } from "./shared";
import { AppComponent } from "./app.component";
import "./app.files";

@NgModule({
	imports: [
		XCommonAutoFormModule,
		XCommonModule,
		AppRouteModule,
		BrowserModule,
		BrowserAnimationsModule,
		MaterialModule,
		ServiceModule,
		SharedModule,
		PublicModule,
		AdminModule,
		WorkshopModule,
		CustomerModule,
		FormsModule
	],
	declarations: [
		AppComponent
	],
	bootstrap: [AppComponent]
})
export class AppModule { }