import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
	selector: 'app-confirm-modal',
	templateUrl: './confirm-modal.component.html',
	styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

	public title: string;
	public message: string;

	constructor(public dialogRef: MatDialogRef<ConfirmModalComponent>) {

	}

	ngOnInit() {
	}

}
