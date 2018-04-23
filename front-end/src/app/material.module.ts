import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatSnackBarModule, MatSliderModule } from '@angular/material';

const modules = [MatButtonModule, MatSliderModule, MatCheckboxModule, MatSnackBarModule];

@NgModule({
	imports: modules,
	exports: modules,
})
export class MaterialModule { }
