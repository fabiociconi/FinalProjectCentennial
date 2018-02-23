import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkshopRoutingModule } from './workshop-routing.module';
import { WorkshopLayoutComponent } from './workshop-layout/workshop-layout.component';
import { WorkshopHomeComponent } from './workshop-home/workshop-home.component';

@NgModule({
  imports: [
    CommonModule,
    WorkshopRoutingModule
  ],
  declarations: [WorkshopLayoutComponent, WorkshopHomeComponent]
})
export class WorkshopModule { }
