import { Routes } from "@angular/router";

import { HomePublicComponent } from "../public/home/home-public.component";
import { SignInComponent } from "../public/account/sign-in.component";
import { SignUpComponent } from "../public/account/sign-up.component";
import { SignUpWorkshopComponent } from "../public/account/sign-up-workshop.component";
import { AboutComponent } from "../public/about/about.component";

export const PUBLIC_ROUTES: Routes = [
	{ path: "account/sign-in", component: SignInComponent },
	{ path: "account/sign-up", component: SignUpComponent },
	{ path: "account/sign-up-workshop", component: SignUpWorkshopComponent },
	{ path: "about", component: AboutComponent },
	{ path: "", component: HomePublicComponent }
];