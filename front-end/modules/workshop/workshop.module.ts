import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";


import { WorkshopComponents } from "./workshop.components";
import { MaterialModule, SharedModule } from "../shared";
import { GoogleMaps } from "../shared/components/googleMaps.component";


@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule,
		MaterialModule,
		SharedModule
	],
	entryComponents: [
		GoogleMaps
	],
	declarations: [
		WorkshopComponents
	]
})
export class WorkshopModule { }