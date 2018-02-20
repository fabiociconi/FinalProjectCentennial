import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { SigninComponent } from './public/signin/signin.component';
import { SignupComponent } from './public/signup/signup.component';
import { PublicLayoutComponent } from './public/public-layout/public-layout.component';

const routes: Routes = [
	{
		path: '', children: [
			{
				path: '', component: PublicLayoutComponent, children:
					[
						{ path: 'sign-in', component: SigninComponent },
						{ path: 'sign-up', component: SignupComponent }
					]
			}
		]
	},
	{ path: 'customer', loadChildren: './customer/customer.module#CustomerModule' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
