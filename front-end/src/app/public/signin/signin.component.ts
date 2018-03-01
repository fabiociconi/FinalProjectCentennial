import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AutoFormService } from 'xcommon/autoform';

import { SingInEntity } from '@app/entity';
import { AuthService } from '@app/service/auth.service';

@Component({
	selector: 'app-signin',
	templateUrl: './signin.component.html',
	styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

	public singInForm: FormGroup;
	public ready = false;

	constructor(private authService: AuthService, private autoFormService: AutoFormService, private router: Router) { }

	public ngOnInit(): void {
		this.singInForm = this.autoFormService.createNew<SingInEntity>()
			.addValidator(c => c.email, Validators.required)
			.addValidator(c => c.email, Validators.email)
			.addValidator(c => c.password, Validators.required)
			.build({
				email: '',
				password: ''
			});

		this.ready = true;
	}

	public signIn(entity: SingInEntity): void {
		this.authService.signIn(entity)
			.subscribe(res => {
				if (!res.hasError) {
					console.log(res.entity.token);
					this.router.navigate(['/customer']);
				}
			});
	}

}
