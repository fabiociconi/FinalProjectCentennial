import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { AutoFormService } from "xcommon";

import { WorkshopService, DialogService } from "../../service";
import { IAddressesEntity, EntityAction, IPeopleEntity, AddressType } from "../../../entity";
import { Guid } from "../../../entity/entity-util";

@Component({
	selector: "workshop-address-detail",
	templateUrl: "./workshop-address-detail.html",
	styleUrls: ["./workshop-address-detail.scss"]
})

export class WorkshopAddressDetailComponent implements OnInit {

	public Workshop: IAddressesEntity;
	public Message: string = "";
	public WorkshopAddressForm: FormGroup;
	public Ready: boolean = false;
	public ShowMessage: boolean = false;

	constructor(
		private workshopService: WorkshopService,
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
			IdPerson: Guid.Empty(),
			City: "",
			Latitude: 0,
			Longitude: 0,
			PostalCode: "",
			Street: "",
			Province: "",
			Country: "",
			StreetNumber: "",
			Type: AddressType.WorkShop
		});
	}

	private BuildForm(entity: IAddressesEntity): void {
		const autoForm = this.autoFormService.CreateNew<IAddressesEntity>();
		this.WorkshopAddressForm = autoForm
			.Build(entity);

		this.Workshop = entity;
		this.Ready = true;
	}

	private LoadAddress(id: string): void {
		this.workshopService.GetAddress(id)
			.subscribe(res => {
				this.BuildForm(res);
			});
	}

	private Back(): void {
		this.router.navigate(["/workshop/address"]);
		return;
	}

	private DeleteAddress(): void {
		this.dialogService.confirm("Warning", "Do you like to delete this Address?")
			.subscribe(res => {
				if (res) {
					this.Workshop.Action = EntityAction.Delete;
					this.SaveChanges(this.Workshop);
				}
			});
	}

	private SaveChanges(entity: IAddressesEntity): void {
		this.workshopService.SetAddress(entity)
			.subscribe(res => {
				if (res.HasErro) {
					this.snackBar.open("Your browser did something unexpected. Please contact us if the problem persists.", "", { duration: 3000 });
					return;
				}

				this.snackBar.open("Thank you! Your address was updated", "", { duration: 3000 });

				if (entity.Action === EntityAction.Delete) {
					this.router.navigate(["/workshop/address"]);
					return;
				}
				this.BuildForm(res.Entity);
			});
	}

	private UpdateAddress(address: IAddressesEntity) {

		if (this.Workshop.Action === EntityAction.None) {
			this.Workshop.Action = EntityAction.Update;
		}

		this.Workshop.StreetNumber = address.StreetNumber;
		this.Workshop.Street = address.Street;
		this.Workshop.City = address.City;
		this.Workshop.Province = address.Province;
		this.Workshop.Country = address.Country;
		this.Workshop.PostalCode = address.PostalCode;
		this.Workshop.Latitude = address.Latitude;
		this.Workshop.Longitude = address.Longitude;

		this.BuildForm(this.Workshop);	
	}
}