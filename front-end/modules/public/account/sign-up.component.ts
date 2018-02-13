import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators } from "@angular/forms";
import { AutoFormService } from "xcommon";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CustomValidators } from "ng2-validation";

import { ISignUpEntity, Guid, RoleType, EntityAction } from "../../../entity";
import { AuthService } from "../../service";

@Component({
	selector: "sign-up",
	templateUrl: "./sign-up.html",
	styleUrls: ["./sign-up.scss"]
})
export class SignUpComponent implements OnInit {

	public Ready: boolean = false;
	public ShowMessage: boolean = false;
	public Message: string = "";
	public SignUpForm: FormGroup;

	constructor(
		private autoFormService: AutoFormService,
		private authService: AuthService,
		private snackBar: MatSnackBar) { }

	public ngOnInit(): void {

		if (this.authService.IsAuthenticated()) {
			this.authService.InitialRedirect();
			return;
		}

		this.NewSignUpForm();
	}

	private SignUp(entity: ISignUpEntity): void {
		this.authService.SignUp(entity)
			.subscribe(res => {
				if (res.HasErro) {
					this.snackBar.open("Your browser did something unexpected.Please contact us if the problem persists.", "", { duration: 3000 });
					return;
				}
				this.snackBar.open("Thank you! You are now registred in our system ", "", { duration: 3000 });
			});
	}

	private BuildForm(entity: ISignUpEntity): void {

		const autoForm = this.autoFormService.CreateNew<ISignUpEntity>();

		this.SignUpForm = autoForm
			.AddValidator(c => c.FirstName, Validators.required)
			.AddValidator(c => c.LastName, Validators.required)
			.AddValidator(c	=> c.Telephone, CustomValidators.phone("CA"))
			.AddValidator(c => c.Telephone, Validators.maxLength(10))
			.AddValidator(c => c.Telephone, Validators.required)
			.AddValidator(c => c.Email, Validators.email)
			.AddValidator(c => c.Email, Validators.required)
			.AddValidator(c => c.Password, Validators.required)
			.AddValidator(c => c.PasswordConfirm, Validators.required)
			.Build(entity);

		this.Ready = true;
	}

	private NewSignUpForm(): void {

		const today = new Date();

		this.BuildForm({
			IdPerson: Guid.NewGuid(),
			FirstName: "",
			LastName: "",
			Telephone: "",
			Email: "",
			Password: "",
			PasswordConfirm: "",
			Action: EntityAction.New,
			RoleType: RoleType.Customer,
			ChangeDate: today,
			CreateDate: today,
			Role: RoleType.Customer,
			Customer: null,
			Workshop: null
		});
	}
}