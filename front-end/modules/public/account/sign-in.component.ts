import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators } from "@angular/forms";
import { AutoFormService } from "xcommon";

import { ISignInEntity } from "../../../entity";
import { AuthService } from "../../service";

import { HttpUtilService } from "xcommon";

@Component({
	selector: "sign-in",
	templateUrl: "./sign-in.html",
	styleUrls: ["./sign-in.scss"]
})
export class SignInComponent implements OnInit {

	public Ready = false;
	public ShowMessage = false;
	public Message = "";
	public SignInForm: FormGroup;

	constructor(private autoFormService: AutoFormService, private authService: AuthService) {  }

	public SignIn(entity: ISignInEntity): void {
		this.authService.SignIn(entity)
			.subscribe(res => {
				if (res.HasErro) {
					this.ShowMessage = true;
					this.Message = "Invalid username and/or password";
				}

				localStorage.setItem("RememberMe", String(entity.RememberMe));
				localStorage.setItem("Email", entity.Email);
				localStorage.setItem("Password", entity.Password);
			});
	}

	public ngOnInit(): void	{

		if (this.authService.IsAuthenticated()) {
			this.authService.InitialRedirect();
			return;
		}

		const autoForm = this.autoFormService.CreateNew<ISignInEntity>();

		var Email = "";
		var Password = "";
		var RememberMe = false;

		if (localStorage.getItem("RememberMe") === "true") {
			Email = localStorage.getItem("Email");
			Password = localStorage.getItem("Password");
			RememberMe = true;
		}

		this.SignInForm = autoForm
			.AddValidator(c => c.Email, Validators.email)
			.AddValidator(c => c.Email, Validators.required)
			.AddValidator(c => c.Password, Validators.required)
			.Build({
				Email: Email,
				Password: Password,
				RememberMe: RememberMe
			});

		this.Ready = true;
	}
}