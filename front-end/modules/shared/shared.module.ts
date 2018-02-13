import { NgModule } from "@angular/core";
import { ConfirmDialog } from "./components/confirm-dialog.component";
import { GoogleMaps } from "./components/googleMaps.component";
import { Icon } from "./components/icon.component";
import { AgmCoreModule } from "@agm/core";
import { AgmSnazzyInfoWindowModule } from "@agm/snazzy-info-window";
import { MaterialModule } from "../shared";

@NgModule({
	imports: [
		MaterialModule,
		AgmCoreModule.forRoot({
			apiKey: "AIzaSyCRrpXHG-pFw0Aj0d1clbtqFX8SQlDauYo",
			libraries: ["places"]
		}),
		AgmSnazzyInfoWindowModule
	],
	declarations: [
		GoogleMaps,
		ConfirmDialog,
		Icon
	],
	exports: [
		GoogleMaps,
		AgmCoreModule,
		AgmSnazzyInfoWindowModule,
		Icon
	]
})
export class SharedModule { }