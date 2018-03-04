import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service';

@Component({
	selector: 'app-customer-layout',
	templateUrl: './customer-layout.component.html',
	styleUrls: ['./customer-layout.component.scss']
})
export class CustomerLayoutComponent implements OnInit {

	constructor(private auth: AuthService) { }

	ngOnInit() {
	}

	public singOut(): void {
		this.auth.signOut();
	}

}
