import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { PublicLayoutComponent } from './public-layout/public-layout.component';
import { MaterialModule } from '../material.module';
import { XCommonAutoFormModule } from 'xcommon/autoform';

@NgModule({
	imports: [
		FormsModule,
		ReactiveFormsModule,
		CommonModule,
		RouterModule,
		MaterialModule,
		XCommonAutoFormModule
	],
	declarations: [SigninComponent, SignupComponent, PublicLayoutComponent]
})
export class PublicModule { }
