import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';

import { GoogleMaps } from './shared-googleMaps/googleMaps.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { ConfirmModalService } from './confirm-modal.service';
import { MatDialogModule } from '@angular/material';

@NgModule({
	imports: [
		MatDialogModule,
		AgmCoreModule.forRoot({
			apiKey: 'AIzaSyBp51eristmNNCv9cz3BuX0Tvgx0E8vil8',
			libraries: ['places']
		}),
		AgmSnazzyInfoWindowModule
	],
	declarations: [GoogleMaps, ConfirmModalComponent],
	exports: [GoogleMaps, AgmCoreModule, AgmSnazzyInfoWindowModule],
	providers: [ConfirmModalService],
	entryComponents: [ConfirmModalComponent]
})
export class SharedModule { }
