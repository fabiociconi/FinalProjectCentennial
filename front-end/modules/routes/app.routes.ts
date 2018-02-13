import { Routes } from "@angular/router";

import { LayoutPublicComponent } from "../public/layout/layout-public.component";
import { HomePulicComponent } from "../public/layout/home-pulic.component";
import { BrunoComponent } from "../public/layout/bruno.component";


export const AppRoutes: Routes = [
	{
		path: "", component: LayoutPublicComponent, children: [
			{ path: "", component: HomePulicComponent },
			{ path: "bruno", component: BrunoComponent }
		]
	}
];
