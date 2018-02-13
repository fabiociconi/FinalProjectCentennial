import { Component, OnInit, Input } from "@angular/core";
import { AutoFormService, EntityAction } from "xcommon";
import { FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";

import { WorkshopService, DialogService } from "../../service";
import { IAddressesEntity } from "../../../entity";

@Component({
	selector: "workshop-address-list",
	templateUrl: "./workshop-address-list.html",
	styleUrls: ["./workshop-address-list.scss"]
})
export class WorkshopAddressListComponent implements OnInit {

	@Input() public id: string;

	public WorkShopAddress: IAddressesEntity[] = [];
	public Message: string = "";
	public Ready: boolean = false;
	public ShowMessage: boolean = false;

	constructor(
		private workshopService: WorkshopService,
		private autoFormService: AutoFormService,
		private router: Router) { }

	public ngOnInit(): void {
		this.LoadList();
		return;
	}

	private LoadList(): void {
		this.workshopService.GetAddresses()
			.subscribe(res => {
				this.WorkShopAddress = res;
			});
		this.Ready = true;
		return;
	}

	public Back(): void {
		this.router.navigate(["/workshop"]);
		return;

	}

	public NewAddress(): void {
		this.router.navigate(["/workshop/address/new"]);
		return;

	}
}
