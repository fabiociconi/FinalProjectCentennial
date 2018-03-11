import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkshopLayoutComponent } from './workshop-layout/workshop-layout.component';
import { WorkshopHomeComponent } from './workshop-home/workshop-home.component';
import { WorkshopAddressFormComponent } from './workshop-address/address-form.component';
import { WorkshopAddressListComponent } from './workshop-address/address-list.component';

const routes: Routes = [
	{ 
		path: '', 
		component: WorkshopLayoutComponent, 
		children: [
			{ 
				path: '',
				component: WorkshopHomeComponent
			},
			{
				path: 'address',
				component: WorkshopAddressListComponent
			},
			{
				path: 'address/:id',
				component: WorkshopAddressFormComponent
			}
		] 
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class WorkshopRoutingModule { }
