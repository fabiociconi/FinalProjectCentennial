import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from "@agm/core";
import { AgmSnazzyInfoWindowModule } from "@agm/snazzy-info-window";

import { GoogleMaps } from './shared-googleMaps/googleMaps.component';

@NgModule({
	imports: [
		AgmCoreModule.forRoot({
			apiKey: "AIzaSyBp51eristmNNCv9cz3BuX0Tvgx0E8vil8",
			libraries: ["places"]
		}),
		AgmSnazzyInfoWindowModule
	],
	declarations: [GoogleMaps],
	exports: [GoogleMaps]
})
export class SharedModule { }
