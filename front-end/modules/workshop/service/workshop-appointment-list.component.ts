import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { WorkshopService, CustomerService } from "../../service";
import { IAppointmentsEntity, IPeopleEntity, ICarsEntity } from "../../../entity";


@Component({
	selector: "workshop-appointment-list",
	templateUrl: "./workshop-appointment-list.html",
	styleUrls: ["./workshop-appointment-list.scss"]
})
export class WorkshopAppointmentListComponent implements OnInit {

	public Appointments: IAppointmentsEntity[] = [];
	public Ready: boolean = false;
	public Message: string = " ";
	public selected: string = "0";
	

	constructor(private workshopService: WorkshopService, private router: Router) { }

	public ngOnInit(): void
	{		
		this.LoadList();
		return;
	}

	private LoadList(): void {
		this.workshopService.GetAppointments()
			.subscribe(res =>
			{
				this.Appointments = res;
				
			});
		
		this.Ready = true;
		return;
	}
	
	public UpdateFilter(): void
	{
		
		//this.workshopService.GetAppointments()
		//	.subscribe(res =>
		//	{
			//this.LoadList();
			
		this.Appointments = this.Appointments.filter(a => a.Status.toString() == this.selected);
				//if (select)
				//{		
				//	this.Appointments = select;
				//}
			//});
		return;	
	}

	public Back(): void	{
		this.router.navigate(["/workshop"]);
		return;
	}
}
