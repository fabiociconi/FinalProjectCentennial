import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { AutoFormService } from "xcommon";

import { CustomerService, DialogService } from "../../service";
import { ICarsEntity, IAppointmentsEntity, EntityAction } from "../../../entity";
import { Guid } from "../../../entity/entity-util";

@Component({
	selector: "customer-car-detail",
	templateUrl: "./customer-car-detail.html",
	styleUrls: ["./customer-car-detail.scss"]
})
export class CustomerCarDetailComponent implements OnInit {

	public Ready = false;
	public idPerson = "";
	public CarDetailForm: FormGroup;
	private Entity: ICarsEntity;
	public Appointments: IAppointmentsEntity[] = [];


	constructor(
		private customerService: CustomerService,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private dialogService: DialogService,
		private snackBar: MatSnackBar,
		private autoFormService: AutoFormService) { }

	public ngOnInit(): void {
		this.customerService.GetProfile()
			.subscribe(res => {
				this.GetIdPerson(res.IdPerson);
			});

		const id = this.activatedRoute.snapshot.params.id;

		if (id === "newcar") {
			this.New();
			return;
		}

		if (id) {
			this.Load(id);
			return;
		}
	}

	public Save(entity: ICarsEntity): void {

		entity.IdPerson = this.idPerson;

		this.customerService.SetCar(entity)
			.subscribe(res => {

				if (res.HasErro) {
					this.snackBar.open("A problem has occurred. Please, try again!", "", {
						duration: 2000
					});

					return;
				}

				if (entity.Action === EntityAction.Delete) {
					this.snackBar.open("Car deleted successfully!", "", {
						duration: 2000
					});
					this.Back();
					return;
				}

				if (entity.Action === EntityAction.New) {
					this.snackBar.open("Car added successfully!", "", {
						duration: 2000
					});
					this.BuildForm(res.Entity);
					return;
				}

				this.snackBar.open("Car saved successfully!", "", {
					duration: 2000
				});

				this.BuildForm(res.Entity);
			});
	}

	public Delete(): void {
		if (this.Entity.Action === EntityAction.New) {
			return;
		}

		this.dialogService.confirm("Warning", "Would you like to delete this car?")
			.subscribe(res => {
				if (res) {
					this.Entity.Action = EntityAction.Delete;
					this.Save(this.Entity);
				}
			});

	}

	private GetIdPerson(idPerson: string): void {
		this.idPerson = idPerson;
	}

	private BuildForm(entity: ICarsEntity): void {
		this.CarDetailForm = this.autoFormService.CreateNew<ICarsEntity>()
			.AddValidator(c => c.Brand, Validators.required)
			.AddValidator(c => c.Brand, Validators.maxLength(50))
			.AddValidator(c => c.Model, Validators.maxLength(100))
			.AddValidator(c => c.Color, Validators.required)
			.AddValidator(c => c.Color, Validators.maxLength(50))
			.AddValidator(c => c.Year, Validators.required)
			.AddValidator(c => c.Year, Validators.maxLength(4))
			.AddValidator(c => c.Trasmission, Validators.required)
			.AddValidator(c => c.LicensePlate, Validators.required)
			.AddValidator(c => c.FuelType, Validators.required)
			.Build(entity);

		this.Entity = entity;
		this.Ready = true;
	}

	private Load(id: string): void {
		this.customerService.GetCar(id)
			.subscribe(res => this.BuildForm(res));
		this.customerService.GetCarHistory(id)
			.subscribe(res => {
				this.AdjustStatus(res);
				console.log(res);
			});
	}

	private AdjustStatus(appointments: IAppointmentsEntity[]): void {
		
		this.Appointments = appointments;

		for (var i = 0; i < appointments.length; i++) {
			if (appointments[i].Status == 0) {
				this.Appointments[i].IdWorkshop = "Open";
			}
			if (appointments[i].Status == 1) {
				this.Appointments[i].IdWorkshop = "Concluded";
			}
			if (appointments[i].Status == 2) {
				this.Appointments[i].IdWorkshop = "Cancelled";
			}			
		}		
	}

	private New(): void {
		this.BuildForm({
			Action: EntityAction.New,
			IdCar: Guid.NewGuid(),
			IdPerson: this.idPerson,
			Brand: "",
			Model: "",
			Color: "",
			Year: 2017,
			Trasmission: 0,
			LicensePlate: "",
			FuelType: 0,
			CreateDate: (new Date())
		});
	}

	private Back(): void {
		this.router.navigate(["/customer/profile/car"]);
	}
}
