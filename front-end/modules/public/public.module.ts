import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from '@angular/router';

import { PublicComponents } from "./public.components";

@NgModule({
    imports: [
		BrowserModule,
		RouterModule
    ],
    declarations: [
		PublicComponents		
    ]
})
export class PublicModule { }