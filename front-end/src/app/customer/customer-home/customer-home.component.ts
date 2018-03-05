import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service';
import { TokenPayload } from '@app/entity';
import { LayoutService } from '@app/service/layout.service';

@Component({
	selector: 'app-customer-home',
	templateUrl: './customer-home.component.html',
	styleUrls: ['./customer-home.component.scss']
})

export class CustomerHomeComponent implements OnInit {

	constructor(private layout: LayoutService) { }

	ngOnInit() {
		this.layout.setTitle('Home');
	}

}
