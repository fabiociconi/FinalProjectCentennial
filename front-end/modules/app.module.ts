import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"; 

import { BrowserModule } from "@angular/platform-browser";
import { XCommonAutoFormModule } from "xcommon";

import "./assets";

import { AppComponent } from "./app.component";
import { PublicModule } from "./public/public.module";
import { RoutesModule } from "./routes/routes.module";

@NgModule({
    imports: [
		CommonModule,
		BrowserModule,
		BrowserAnimationsModule,
		ReactiveFormsModule,
		FormsModule,
		PublicModule,
		RoutesModule,
		XCommonAutoFormModule
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }