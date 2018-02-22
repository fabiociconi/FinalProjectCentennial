import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

	public label1 = 'First name';
	public label2 = 'Last name';
	public accountType = 'Customer';
	public customerTabSelected = 'tab-selected';
	public workshopTabSelected = '';

	constructor() {}

	ngOnInit() {}

	public customerAccount(): void {
		this.label1 = 'First name';
		this.label2 = 'Last name';
		this.accountType = 'Customer';
		this.customerTabSelected = 'tab-selected';
		this.workshopTabSelected = '';
	}

	public workshopAccount(): void {
		this.label1 = 'Display name';
		this.label2 = 'Legal name';
		this.accountType = 'Workshop';
		this.customerTabSelected = '';
		this.workshopTabSelected = 'tab-selected';
	}

}
