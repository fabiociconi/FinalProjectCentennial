import { Component, OnInit } from "@angular/core";

import { WorkshopService } from "../../service";
import { IWorkshopServicesEntity, IServicesEntity } from "../../../entity";

@Component({
	selector: "workshop-price-table",
	templateUrl: "./workshop-price-table.html",
	styleUrls: ["./workshop-price-table.scss"]
})
export class WorkshopPriceTableComponent implements OnInit {

    public Services: IWorkshopServicesEntity[];
    public Service: IServicesEntity;
    public idService = "";

    constructor(private workshopService: WorkshopService) { }

    public ngOnInit(): void {
        this.workshopService.GetWorkshopServices()
            .subscribe(res => {
                this.Services = res;
            });   
    }

    public LoadService(serviceId: string) {

        this.workshopService.GetService(serviceId)
            .subscribe(res => {
                this.Service = res;
            });
        return this.Service;
    }
	
}
