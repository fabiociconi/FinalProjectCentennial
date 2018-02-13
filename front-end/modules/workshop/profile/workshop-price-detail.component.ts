import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { AutoFormService } from "xcommon";

import { WorkshopService, DialogService } from "../../service";
import { IWorkshopServicesEntity, IServicesEntity, EntityAction } from "../../../entity";
import { Guid } from "../../../entity/entity-util";

@Component({
	selector: "workshop-price-detail",
	templateUrl: "./workshop-price-detail.html",
	styleUrls: ["./workshop-price-detail.scss"]
})
export class WorkshopPriceDetailComponent implements OnInit {

	public Ready = false;
	public ServiceDetailForm: FormGroup;
	private Entity: IWorkshopServicesEntity;
    public Services: IServicesEntity[] = [];
    public FilteredServices: IServicesEntity[] = [];
    public WorkshopServices: IWorkshopServicesEntity[] = [];
    public Service: IServicesEntity;
    public arrayServices: string[] = [];
    public arrayWorkshopServices: string[] = [];
    public TempServiceId: string;
    public missing: string[] = [];

	constructor(
		private workshopService: WorkshopService,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private dialogService: DialogService,
		private snackBar: MatSnackBar,
		private autoFormService: AutoFormService) { }

    public ngOnInit(): void {

		this.activatedRoute.params.subscribe(p => {
            const id = p.id;
            if (id == "newservice") {
                this.LoadServicesFiltered(id);
                this.New();
				return;
			}

            if (id) {
                this.LoadServicesFiltered(id);
                this.Load(id);
				return;
			}
        });
		
		
    }  
	    
	public Save(entity: IWorkshopServicesEntity): void {

		this.workshopService.SetWorkshopService(entity)
			.subscribe(res => {

				if (res.HasErro) {
					this.snackBar.open("A problem has occurred. Please, try again!", "", {
						duration: 2000,
					});

					return;
				}

				if (entity.Action === EntityAction.Delete) {
					this.snackBar.open("Service deleted successfully!", "", {
						duration: 2000,
					});

					this.Back();
					return;
				}

                if (entity.Action === EntityAction.New) {
                    this.snackBar.open("Service added successfully!", "", {
                        duration: 2000,
                    });
                    this.BuildForm(res.Entity);
                    this.Back();
                    return;
                }

                this.snackBar.open("Service saved successfully!", "", {
                    duration: 2000,
                });
                this.BuildForm(res.Entity);
                this.Back();
			});
	}

	public Delete(): void {
		if (this.Entity.Action === EntityAction.New) {
			return;
		}

		this.dialogService.confirm("Warning", "Would you like to delete this service?")
			.subscribe(res => {
				if (res) {
					this.Entity.Action = EntityAction.Delete;
					this.Save(this.Entity);
				}
			});

	}

    private New(): void {
		
		this.BuildForm({
			Action: EntityAction.New,
			IdWorkshopService: Guid.NewGuid(),
			IdWorkshop: Guid.Empty(),
            IdService: null,
			Service: null,
			Price: 0
		});
	}

    private Back(): void {	

        this.router.navigate(["/workshop/pricetable"]);
		return;
    }
	
    private BuildForm(entity: IWorkshopServicesEntity): void {
		this.ServiceDetailForm = this.autoFormService.CreateNew<IWorkshopServicesEntity>()
			.Build(entity);
        
		this.Entity = entity;
		this.Ready = true;
	}

	private Load(id: string): void {
		this.workshopService.GetWorkshopService(id)
			.subscribe(res => this.BuildForm(res));
	}


    private LoadServicesFiltered(id: string): void {	

        this.workshopService.GetWorkshopServices()
            .subscribe(res => {
                this.workshopService.GetServices()
                    .subscribe(response => {
                        this.GetBothServices(res, response, id);
                    });
            });
    }

    private GetService(serviceId: string): void {
        this.TempServiceId = serviceId;
    }

    private GetBothServices(workshopservices: IWorkshopServicesEntity[], services: IServicesEntity[], id: string): void {
        this.Services = services;
        this.WorkshopServices = workshopservices;		
        this.ArrayService(this.Services);        
        this.ArrayWorkshopService(this.WorkshopServices);
		
        let missing = this.arrayServices.filter(item => this.arrayWorkshopServices.indexOf(item) < 0);
        for (var i = 0; i < missing.length; i++) {
            this.workshopService.GetService(missing[i])
				.subscribe(res => {
                    this.FilteredServices.push(res);
			    });
        }        
        
        if (id != "newservice") {

            this.workshopService.GetWorkshopService(id)
                .subscribe(res => {
                    this.workshopService.GetService(res.IdService)
                        .subscribe(response => {
                            this.FilteredServices.push(response);
                        });					
                });
        }

        if ((id == "newservice") && (missing.length == 0)) {
            this.snackBar.open("All Services are already added in your Workshop!", "", {
                duration: 4000,
            });
            this.Back();
        }
		
    }
	
    private ArrayService(services: IServicesEntity[]): void {
        for (var i = 0; i < services.length; i++) {
            this.arrayServices.push(services[i].IdService);
        }
    }

    private ArrayWorkshopService(workshopservices: IWorkshopServicesEntity[]): void {
        for (var i = 0; i < workshopservices.length; i++) {
            this.arrayWorkshopServices.push(workshopservices[i].IdService);
        }
    }
}