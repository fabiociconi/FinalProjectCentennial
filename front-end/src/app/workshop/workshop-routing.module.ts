import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkshopLayoutComponent } from './workshop-layout/workshop-layout.component';
import { WorkshopHomeComponent } from './workshop-home/workshop-home.component';
import { WorkshopAddressFormComponent } from './workshop-address/address-form.component';
import { WorkshopAddressListComponent } from './workshop-address/address-list.component';
import { WorkshopProfileComponent } from './workshop-profile/workshop-profile.component';
import { WorkshopPriceListComponent } from './workshop-price/price-list.component';
import { WorkshopPriceFormComponent } from './workshop-price/price-form.component';
import { WorkshopAppointmentListComponent } from './workshop-appointment/appointment-list.component';
import { WorkshopAppointmentFormComponent } from './workshop-appointment/appoinment-form.component';

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
				path: 'profile',
				component: WorkshopProfileComponent
			},
			{
				path: 'address',
				component: WorkshopAddressListComponent
			},
			{
				path: 'address/:id',
				component: WorkshopAddressFormComponent
			},
			{
				path: 'price',
				component: WorkshopPriceListComponent
			},
			{
				path: 'price/:id',
				component: WorkshopPriceFormComponent
			},
			{
				path: 'appointments',
				component: WorkshopAppointmentListComponent
			},
			{
				path: 'appointments/:id',
				component: WorkshopAppointmentFormComponent
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class WorkshopRoutingModule { }
