import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';
import { AutoFormService } from 'xcommon';

import { SingInEntity } from '../../../../../entity';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

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
		this.singInForm = this.autoFormService.CreateNew<SingInEntity>()
			// .AddValidator(c => c.email, Validators.required)
			// .AddValidator(c => c.email, Validators.email)
			// .AddValidator(c => c.password, Validators.required)
			.Build({
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
