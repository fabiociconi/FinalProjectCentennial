import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { AdminComponents } from "./admin.components";
import { MaterialModule, SharedModule } from "../shared";

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule,
		MaterialModule,
		SharedModule
	],
	declarations: [
		AdminComponents
	]
})
export class AdminModule { }