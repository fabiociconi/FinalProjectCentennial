import { Routes } from "@angular/router";

import { LayoutWorkshopComponent } from "../workshop/layout";
import { HomeWorkshopComponent } from "../workshop/home";
import {
    WorkshopPriceTableComponent,
    WorkshopPriceDetailComponent,
	WorkshopProfileDetailComponent,
	WorkshopAddressListComponent,
    WorkshopAddressDetailComponent
} from "../workshop/profile";
import { WorkshopAppointmentDetailComponent, WorkshopAppointmentListComponent } from "../workshop/service";

export const WORKSHOP_ROUTES: Routes = [
	{ path: "", component: HomeWorkshopComponent },
	{ path: "profile", component: WorkshopProfileDetailComponent },
	{ path: "address", component: WorkshopAddressListComponent },
	{ path: "address/:id", component: WorkshopAddressDetailComponent },
    { path: "pricetable", component: WorkshopPriceTableComponent },
    { path: "pricetable/:id", component: WorkshopPriceDetailComponent },
	{ path: "appointment", component: WorkshopAppointmentListComponent },
	{ path: "appointment/:id", component: WorkshopAppointmentDetailComponent }
];