import { Component, OnInit } from "@angular/core";
import { AutoFormService, EntityAction } from "xcommon";
import { FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";

import { WorkshopService, DialogService } from "../../service";
import { IPeopleEntity, IAddressesEntity } from "../../../entity";

@Component({
	selector: "workshop-profile-detail",
	templateUrl: "./workshop-profile-detail.html",
	styleUrls: ["./workshop-profile-detail.scss"]
})
export class WorkshopProfileDetailComponent implements OnInit {

	public Workshop: IPeopleEntity;
	public Message: string = "";
	public WorkShopProfileForm: FormGroup;
	public Ready: boolean = false;
	public ShowMessage: boolean = false;

	constructor(
		private workshopService: WorkshopService,
		private autoFormService: AutoFormService,
		private snackBar: MatSnackBar,
		private dialogService: DialogService,
		private router: Router) { }

	public ngOnInit(): void {
		this.LoadProfile();
	}

	private BuildFormProfile(entity: IPeopleEntity): void {
		const autoForm = this.autoFormService.CreateNew<IPeopleEntity>();

		this.WorkShopProfileForm = autoForm
			.Build(entity);

		this.Workshop = entity;
		this.Ready = true;
	}

	private LoadProfile(): void {

		this.workshopService.GetProfile()
			.subscribe(res => {
				this.BuildFormProfile(res);

			});
	}

	private Back(): void {
		this.router.navigate(["/workshop"]);
		return;

	}

	private DeleteProfile(): void {
		this.dialogService.confirm("Warnning", "Do you like to delete your Account?")
			.subscribe(res => {
				if (res) {
					this.Workshop.Action = EntityAction.Delete;
					this.SaveChanges(this.Workshop);
				}
			});
	}

	private SaveChanges(entity: IPeopleEntity): void {

		entity.ChangeDate = new Date();

		this.workshopService.SetProfile(entity)
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
				this.BuildFormProfile(res.Entity);
			});
	}
}
