import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service';
import { TokenPayload } from '@app/entity';

@Component({
	selector: 'app-customer-home',
	templateUrl: './customer-home.component.html',
	styleUrls: ['./customer-home.component.scss']
})

export class CustomerHomeComponent implements OnInit {

	public title = 'Home';
	public User: TokenPayload;

	constructor(private auth: AuthService) { }

	ngOnInit() {
		this.User = this.auth.user;
	}

}
