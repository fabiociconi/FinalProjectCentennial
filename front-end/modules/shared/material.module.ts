import { NgModule } from "@angular/core";
import {
	MatButtonModule,
	MatInputModule,
	MatSelectModule,
	MatToolbarModule,
	MatTooltipModule,
	MatExpansionModule,
	MatMenuModule,
	MatDialogModule,
	MatSnackBarModule,
	MatRadioModule,
	MatCheckboxModule,
	MatSidenavModule,
	MatSliderModule,
	MatFormFieldModule,
	MatDatepickerModule,
	MatNativeDateModule
} from "@angular/material";

@NgModule({
	imports: [
		MatButtonModule,
		MatInputModule,
		MatSelectModule,
		MatToolbarModule,
		MatTooltipModule,
		MatExpansionModule,
		MatMenuModule,
		MatRadioModule,
		MatDialogModule,
		MatSnackBarModule,
		MatCheckboxModule,
		MatSidenavModule,
		MatFormFieldModule,
		MatSliderModule,
		MatDatepickerModule,
		MatNativeDateModule
	],
	exports: [
		MatButtonModule,
		MatInputModule,
		MatSelectModule,
		MatToolbarModule,
		MatTooltipModule,
		MatExpansionModule,
		MatMenuModule,
		MatRadioModule,
		MatDialogModule,
		MatSnackBarModule,
		MatCheckboxModule,
		MatSidenavModule,
		MatFormFieldModule,
		MatSliderModule,
		MatDatepickerModule,
		MatNativeDateModule
	]
})
export class MaterialModule { }