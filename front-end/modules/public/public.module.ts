import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { PublicComponents } from "./public.components";
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
		PublicComponents
	]
})
export class PublicModule { }