import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar, MatDatepickerModule, MatNativeDateModule } from "@angular/material";

import { AutoFormService } from "xcommon";


import { WorkshopService, CustomerService, DialogService } from "../../service";
import { IAppointmentsEntity, IWorkshopsEntity, EntityAction, IAppointmentsServicesEntity, ICarsEntity, IWorkshopServicesEntity } from "../../../entity";
import { Guid } from "../../../entity/entity-util";

@Component({
	selector: "workshop-appointment-detail",
	templateUrl: "./workshop-appointment-detail.html",
	styleUrls: ["./workshop-appointment-detail.scss"]
})
export class WorkshopAppointmentDetailComponent implements OnInit
{

	public Workshop: IWorkshopsEntity;
	public services: IWorkshopServicesEntity[];
	public Appointment: IAppointmentsEntity;
	public Message: string = "";
	public AppointmentForm: FormGroup;
	public Ready: boolean = false;
	public ShowMessage: boolean = false;


	constructor(
		private workshopService: WorkshopService,
		private snackBar: MatSnackBar,
		private dialogService: DialogService,
		private autoFormService: AutoFormService,
		private activatedRoute: ActivatedRoute,
		private router: Router) { }

	public ngOnInit(): void
	{
		const id = this.activatedRoute.snapshot.params.id;
		console.log(id);

		if (id) {
			this.LoadAppointment(id);
			return;
		}
	}


	private BuildForm(appointment: IAppointmentsEntity): void
	{
		const autoForm = this.autoFormService.CreateNew<IAppointmentsEntity>()

		this.Appointment = appointment;

		this.workshopService.GetWorkshopServices()
			.subscribe(res =>
			{
				this.services = res;

				this.services.forEach(service =>
				{

					const serviceItem = appointment.Services.find(a => a.IdService == service.IdService);

					if (!serviceItem) {

						appointment.Services.push({
							Action: EntityAction.New,
							IdAppointment: appointment.IdAppointment,
							IdAppointmentService: Guid.NewGuid(),
							IdService: service.IdService,
							Price: service.Price,
							Service: service.Service
						});
					}
				});


				this.AppointmentForm = autoForm
					.Build(appointment);

				this.Ready = true;
			});
	}

	private LoadAppointment(id: string): void
	{
		this.workshopService.GetAppointment(id)
			.subscribe(res => this.BuildForm(res));

	}

	private Back(): void
	{
		this.router.navigate(["/workshop/appointment/"]);
		return;
	}

	public SaveChanges(entity: IAppointmentsEntity): void
	{

		this.workshopService.SetAppointment(entity)
			.subscribe(res =>
			{
				if (res.HasErro) {
					this.snackBar.open("Your browser did something unexpected. Please contact us if the problem persists.", "", { duration: 3000 });
					return;
				}

				this.snackBar.open("Thank you! Your changes was saved", "", { duration: 3000 });

				if (entity.Action === EntityAction.Delete) {
					this.router.navigate(["/workshop/appointment"]);
					return;
				}
				this.BuildForm(res.Entity);
			});
	}

	private Delete(): void
	{
		this.dialogService.confirm("Warning", "Do you like to delete this Appointment?")
			.subscribe(res =>
			{
				if (res) {
					this.Appointment.Action = EntityAction.Delete;
					this.SaveChanges(this.Appointment);
				}
			});
	}
}
