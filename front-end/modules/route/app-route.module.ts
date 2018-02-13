import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";

import { LayoutPublicComponent } from "../public/layout";
import { LayoutAdminComponent } from "../admin/layout";
import { LayoutCustomerComponent } from "../customer/layout";
import { LayoutWorkshopComponent } from "../workshop/layout";

import { AdminGuard, CustomerGuard, WorkShopGuard } from "./guards";

import { ADMIN_ROUTES } from "./admin.routes";
import { PUBLIC_ROUTES } from "./public.routes";
import { CUSTOMER_ROUTES } from "./customer.routes";
import { WORKSHOP_ROUTES } from "./workshop.routes";

const APP_ROUTES: Routes = [
	{ path: "", component: LayoutPublicComponent, children: PUBLIC_ROUTES },
	{ path: "customer", canActivate: [CustomerGuard], component: LayoutCustomerComponent, children: CUSTOMER_ROUTES },
	{ path: "workshop", canActivate: [WorkShopGuard], component: LayoutWorkshopComponent, children: WORKSHOP_ROUTES },
	{ path: "admin", canActivate: [AdminGuard], component: LayoutAdminComponent, children: ADMIN_ROUTES }
];

@NgModule({
	imports: [
		RouterModule.forRoot(APP_ROUTES)
	],
	exports: [
		RouterModule
	],
	declarations: [
	],
	providers: [
		AdminGuard,
		CustomerGuard,
		WorkShopGuard
	]
})
export class AppRouteModule { }