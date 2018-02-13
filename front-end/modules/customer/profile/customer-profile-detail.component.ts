import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators } from "@angular/forms";
import { AutoFormService, EntityAction } from "xcommon";
import { MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";

import { CustomerService, DialogService } from "../../service";
import { IPeopleEntity } from "../../../entity";

@Component({
	selector: "customer-profile-detail",
	templateUrl: "./customer-profile-detail.html",
	styleUrls: ["./customer-profile-detail.scss"]
})
export class CustomerProfileDetailComponent implements OnInit {

	public Person: IPeopleEntity;
	public Message: string = "";
	public CustomerProfileForm: FormGroup;
	public Ready: boolean = false;
	public ShowMessage: boolean = false;

	constructor(
		private customerService: CustomerService,
		private autoFormService: AutoFormService,
		private snackBar: MatSnackBar,
		private dialogService: DialogService,
		private router: Router) { }

	public ngOnInit(): void {
		this.LoadProfile();
	}

	private BuildForm(entity: IPeopleEntity): void {
		const autoForm = this.autoFormService.CreateNew<IPeopleEntity>();

		this.CustomerProfileForm = autoForm
			//.AddValidator(c => c.FirstName, Validators.required)
			//.AddValidator(c => c.LastName, Validators.required)
			//.AddValidator(c => c.Telephone, Validators.required)
			//.AddValidator(c => c.Email, Validators.email)
			//.AddValidator(c => c.Email, Validators.required)
			.Build(entity);

		this.Person = entity;
		this.Ready = true;
	}

	private LoadProfile(): void {
		this.customerService.GetProfile()
			.subscribe(res => {
				this.BuildForm(res);
			});
	}

	private Back(): void {
		this.router.navigate(["/customer"]);
		return;
	}

	private DeleteProfile(): void {

		this.dialogService.confirm("Warnning", "Do you like to delete your Account?")
			.subscribe(res => {
				if (res) {
					this.Person.Action = EntityAction.Delete;
					this.SaveChanges(this.Person);
				}
			});
	}

	private SaveChanges(entity: IPeopleEntity): void {

		entity.ChangeDate = new Date();

		this.customerService.SetProfile(entity)
			.subscribe(res => {
				if (res.HasErro) {
					this.snackBar.open("Your browser did something unexpected.Please contact us if the problem persists.", "", { duration: 3000 });
					return;
				}
				this.snackBar.open("Thank you! You are profile was Updated", "", { duration: 3000 });

				if (entity.Action === EntityAction.Delete) {
					this.router.navigate(["/"]);
					return;
				}
				this.BuildForm(res.Entity);
			});
	}
}
