import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AutoFormService } from 'xcommon/autoform';

import { SingInEntity, TokenPayload } from '@app/entity';
import { AuthService } from '@app/service/auth.service';

@Component({
	selector: 'app-signin',
	templateUrl: './signin.component.html',
	styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

	public singInForm: FormGroup;
	public ready = false;
	public authenticated: boolean;
	public user: TokenPayload;
	public errorMessage: string;
	public error = false;

	constructor(private auth: AuthService, private autoFormService: AutoFormService, private router: Router) {
		this.authenticated = auth.authenticated;
		this.user = auth.user;
	}

	public ngOnInit(): void {
		this.singInForm = this.autoFormService.createNew<SingInEntity>()
			.addValidator(c => c.email, Validators.required)
			.addValidator(c => c.email, Validators.email)
			.addValidator(c => c.password, Validators.required)
			.build({
				email: '',
				password: '',
				remember: false
			});

		this.ready = true;
	}

	public singOut(): void {
		this.auth.signOut(false);
		this.authenticated = false;
		this.user = null;
	}

	public signIn(entity: SingInEntity): void {
		this.auth.signIn(entity)
			.subscribe(res => {
				if (res.hasError) {
					this.error = true;
					this.errorMessage = 'Invalid User or Password';
					return;
				}
			});
	}

}
