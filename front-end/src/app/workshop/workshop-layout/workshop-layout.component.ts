import { Component, OnInit } from '@angular/core';
import { LayoutService } from '@app/service/layout.service';
import { AuthService } from '@app/service/auth.service';
import { TokenPayload } from '@app/entity';

@Component({
	selector: 'app-workshop-layout',
	templateUrl: './workshop-layout.component.html',
	styleUrls: ['./workshop-layout.component.scss']
})
export class WorkshopLayoutComponent implements OnInit {

	public title = 'eWorkshop';
	public user: TokenPayload;

	constructor(private auth: AuthService, private layout: LayoutService) { }

	ngOnInit() {
		this.user = this.auth.user;
		this.layout.title.subscribe(res => this.title = res);
	}

	public singOut(): void {
		this.auth.signOut();
	}

}
