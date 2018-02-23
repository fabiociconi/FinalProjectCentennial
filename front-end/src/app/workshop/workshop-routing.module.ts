import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkshopLayoutComponent } from './workshop-layout/workshop-layout.component';
import { WorkshopHomeComponent } from './workshop-home/workshop-home.component';

const routes: Routes = [
	{ path: '', component: WorkshopLayoutComponent, children: [
		{ path: '', component: WorkshopHomeComponent }
	] }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class WorkshopRoutingModule { }
