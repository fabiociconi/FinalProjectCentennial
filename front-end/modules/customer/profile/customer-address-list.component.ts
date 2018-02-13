import { Component, OnInit, Input } from "@angular/core";
import { AutoFormService, EntityAction } from "xcommon";
import { FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";

import { CustomerService, DialogService } from "../../service";
import { IAddressesEntity } from "../../../entity";

@Component({
	selector: "customer-address-list",
	templateUrl: "./customer-address-list.html",
	styleUrls: ["./customer-address-list.scss"]
})
export class CustomerAddressListComponent implements OnInit {

	@Input() public id: string;

	public CustomerAddress: IAddressesEntity[] = [];
	public Message: string = "";
	public Ready: boolean = false;
	public ShowMessage: boolean = false;

	constructor(
		private customerService: CustomerService,
		private autoFormService: AutoFormService,
		private router: Router) { }

	public ngOnInit(): void {
		this.LoadList();
		return;
	}

	private LoadList(): void {
		this.customerService.GetAddresses()
			.subscribe(res => {
				this.CustomerAddress = res;
			});
		this.Ready = true;
		return;
	}

	public Back(): void {
		this.router.navigate(["/customer"]);
		return;

	}

	public NewAddress(): void {
		this.router.navigate(["/customer/address/new"]);
		return;
	}
}
