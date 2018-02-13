import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { AutoFormService } from "xcommon";

import { CustomerService, DialogService } from "../../service";
import { IAddressesEntity, EntityAction, IPeopleEntity, AddressType } from "../../../entity";
import { Guid } from "../../../entity/entity-util";

@Component({
	selector: "customer-address-detail",
	templateUrl: "./customer-address-detail.html",
	styleUrls: ["./customer-address-detail.scss"]
})

export class CustomerAddressDetailComponent implements OnInit {

	public Customer: IAddressesEntity;
	public Message: string = "";
	public CustomerAddressForm: FormGroup;
	public Ready: boolean = false;
	public ShowMessage: boolean = false;

	constructor(
		private customerService: CustomerService,
		private autoFormService: AutoFormService,
		private snackBar: MatSnackBar,
		private dialogService: DialogService,
		private activatedRoute: ActivatedRoute,
		private router: Router) { }

	public ngOnInit(): void {
		const id = this.activatedRoute.snapshot.params.id;
		if (id === "new" || !id) {
			this.NewAddress();
			return;
		}

		this.LoadAddress(id);
	}

	private NewAddress(): void {
		this.BuildForm({
			Action: EntityAction.New,
			IdAddress: Guid.NewGuid(),
			Name: "",
			IdPerson: Guid.Empty(),
			City: "",
			Latitude: 0,
			Longitude: 0,
			PostalCode: "",
			Street: "",
			Province: "",
			Country: "",
			StreetNumber: "",
			Type: AddressType.Home
		});
	}

	private BuildForm(entity: IAddressesEntity): void {
		const autoForm = this.autoFormService.CreateNew<IAddressesEntity>();
		this.CustomerAddressForm = autoForm
			.Build(entity);

		this.Customer = entity;
		this.Ready = true;
	}

	private LoadAddress(id: string): void {
		this.customerService.GetAddress(id)
			.subscribe(res => {
				this.BuildForm(res);
			});
	}

	private Back(): void {
		this.router.navigate(["/customer/address"]);
		return;
	}

	private DeleteAddress(): void {
		this.dialogService.confirm("Warning", "Do you like to delete this Address?")
			.subscribe(res => {
				if (res) {
					this.Customer.Action = EntityAction.Delete;
					this.SaveChanges(this.Customer);
				}
			});
	}

	private SaveChanges(entity: IAddressesEntity): void {
		this.customerService.SetAddress(entity)
            .subscribe(res => {
				if (res.HasErro) {
					this.snackBar.open("Your browser did something unexpected. Please contact us if the problem persists.", "", { duration: 3000 });
					return;
				}

				this.snackBar.open("Thank you! Your address was updated", "", { duration: 3000 });

				if (entity.Action === EntityAction.Delete) {
					this.router.navigate(["/customer/address"]);
					return;
				}
				this.BuildForm(res.Entity);
			});
	}

    private UpdateAddress(address: IAddressesEntity) {

        if (this.Customer.Action === EntityAction.None) {
            this.Customer.Action = EntityAction.Update;
        }

		this.Customer.StreetNumber = address.StreetNumber;
		this.Customer.Street = address.Street;
		this.Customer.City = address.City;
		this.Customer.Province = address.Province;
		this.Customer.Country = address.Country;
		this.Customer.PostalCode = address.PostalCode;
		this.Customer.Latitude = address.Latitude;
		this.Customer.Longitude = address.Longitude;

		this.BuildForm(this.Customer);	
	}
}