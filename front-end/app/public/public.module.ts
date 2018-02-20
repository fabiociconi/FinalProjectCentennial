import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { PublicLayoutComponent } from './public-layout/public-layout.component';
import { MaterialModule } from '../material.module';

@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		MaterialModule
	],
	declarations: [SigninComponent, SignupComponent, PublicLayoutComponent]
})
export class PublicModule { }
