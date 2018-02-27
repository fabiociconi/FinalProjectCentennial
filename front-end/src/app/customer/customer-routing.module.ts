import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerLayoutComponent } from './customer-layout/customer-layout.component';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';

const routes: Routes = [
	{
		path: '',
		component: CustomerLayoutComponent,
		children: [
			{
				path: '',
				component: CustomerHomeComponent
			},
			{
				path: 'profile',
				component: CustomerProfileComponent
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CustomerRoutingModule { }
