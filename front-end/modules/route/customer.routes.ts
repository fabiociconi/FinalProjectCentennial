import { Routes } from "@angular/router";

import { HomeCustomerComponent } from "../customer/home";
import { CustomerCarDetailComponent, CustomerCarListComponent, CustomerProfileDetailComponent, CustomerAddressListComponent, CustomerAddressDetailComponent } from "../customer/profile";
import { CustomerAppointmentDetailComponent, CustomerAppointmentListComponent, SearchComponent } from "../customer/service";

export const CUSTOMER_ROUTES: Routes = [
	{ path: "", component: HomeCustomerComponent },
	{ path: "address", component: CustomerAddressListComponent },
	{ path: "address/:id", component: CustomerAddressDetailComponent },
	{ path: "profile", component: CustomerProfileDetailComponent },
	{ path: "profile/car", component: CustomerCarListComponent },
	{ path: "profile/car/:id", component: CustomerCarDetailComponent },
	{ path: "search", component: SearchComponent },
	{ path: "appointment", component: CustomerAppointmentListComponent },
	{ path: "appointment/:id", component: CustomerAppointmentDetailComponent },
	{ path: "appointment/:id/:idWorkshop/:idAddress", component: CustomerAppointmentDetailComponent }
];