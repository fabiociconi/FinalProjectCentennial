import { Routes } from "@angular/router";

import { HomeAdminComponent } from "../admin/home";

export const ADMIN_ROUTES: Routes = [
	{ path: "", component: HomeAdminComponent }
];

export function AdminRoutes(): Routes {
	return [
		{ path: "", component: HomeAdminComponent }
	];
}