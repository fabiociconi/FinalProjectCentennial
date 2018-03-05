import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatSnackBarModule } from '@angular/material';

const modules = [MatButtonModule, MatCheckboxModule, MatSnackBarModule];

@NgModule({
	imports: modules,
	exports: modules,
})
export class MaterialModule { }
