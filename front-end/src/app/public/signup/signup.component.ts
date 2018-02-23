import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { AutoFormService } from 'xcommon';
import { Router } from '@angular/router';
import { SingUpEntity } from '../../../../../entity';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

	public singUpForm: FormGroup;
	public ready = false;

	public label1 = 'First name';
	public label2 = 'Last name';
	public accountType = 'Customer';
	public customerTabSelected = 'tab-selected';
	public workshopTabSelected = '';

	constructor(private authService: AuthService, private autoFormService: AutoFormService, private router: Router) { }

	ngOnInit() {
		this.singUpForm = this.autoFormService.CreateNew<SingUpEntity>()
			// .AddValidator(c => c.email, Validators.required)
			// .AddValidator(c => c.email, Validators.email)
			// .AddValidator(c => c.password, Validators.required)
			.Build({
				password: '',
				role: 1,
				email: '',
				firstName: '',
				lastName: ''
			});

		this.ready = true;
	}

	public signUp(entity: SingUpEntity): void {
		this.authService.signUp(entity)
			.subscribe(res => {
				if (!res.hasError) {
					console.log(res.entity.token);
					this.router.navigate(['/customer']);
				}
			});
	}

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
