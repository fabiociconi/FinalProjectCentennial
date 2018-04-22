import { Injectable } from '@angular/core';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

@Injectable()
export class ConfirmModalService {

	constructor(private dialog: MatDialog) { }

	public confirm(title: string, message: string): Observable<boolean> {

		let dialogRef: MatDialogRef<ConfirmModalComponent>;

		dialogRef = this.dialog.open(ConfirmModalComponent);

		dialogRef.componentInstance.title = title;
		dialogRef.componentInstance.message = message;

		return dialogRef.afterClosed();

	}
}
