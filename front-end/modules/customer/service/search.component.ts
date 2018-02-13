import { Component, OnInit, ViewChild, ElementRef, HostListener } from "@angular/core";
import { CustomerService, WorkshopService } from "../../service";
import { IWorkshopsEntity, IWorkshopsFilter, ICoordinates, IServicesEntity, IAddressesEntity } from "../../../entity";



@Component({
	selector: "search",
	templateUrl: "./search.html",
	styleUrls: ["./search.scss"]
})
export class SearchComponent implements OnInit {

	public Workshops: IWorkshopsEntity[] = [];
	public Services: IServicesEntity[] = [];
	public UserAddresses: IAddressesEntity[] = [];
	public Filter: IWorkshopsFilter = { MaximumDistance: 0 };
	public BaseLocation = "0";

	public CurrentLat = 0;
	public CurrentLng = 0;

	public lat = 0;
	public lng = 0;
	public zoom = 4;
	public MapSize = 0;
	public MaximumDistance = 30;

	@ViewChild('divMap') public DivMap: ElementRef;

	constructor(private customerService: CustomerService, private workshopService: WorkshopService) { }

	public ngOnInit(): void {

		setTimeout(() => this.OnResize(null), 100);
		this.workshopService.GetServices()
			.subscribe(res => this.Services = res);

		this.GetAddresses();
		this.SetCurrentPosition();
	}

	@HostListener('window:resize', ['$event'])
	public OnResize(event: Event): void {
		this.MapSize = this.DivMap.nativeElement.offsetHeight;
	}

	private SetCurrentPosition() {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(
				position => {
					this.CurrentLat = position.coords.latitude;
					this.CurrentLng = position.coords.longitude;
					this.zoom = 4;
					this.UpdateLocation();
					this.GetWorkshop();
				},
				error => {
					this.UpdateLocation();
					this.GetWorkshop();
				});
		}
	}

	private GetServices(): string[] {
		const result: string[] = [];

		this.Services.forEach(item => {
			if (item.Selected === true) {
				result.push(item.IdService);
			}
		});

		return result;
	}

	public GetAddresses(): void {
		this.customerService.GetAddresses()
			.subscribe(res => {
				this.UserAddresses = res;
			});
	}

	public UpdateLocation(): void {
		this.lat = this.CurrentLat;
		this.lng = this.CurrentLng;

		const address = this.UserAddresses.find(a => a.IdAddress === this.BaseLocation);

		if (address) {
			this.lat = address.Latitude;
			this.lng = address.Longitude;
		}
	}

	public GetWorkshop(): void {
		this.Filter.MaximumDistance = this.MaximumDistance;
		this.Filter.ClientLatitude = this.lat;
		this.Filter.ClientLongitude = this.lng;

		this.Filter.IdServices = this.GetServices();

		this.customerService.Search(this.Filter)
			.subscribe(res => {
				this.Workshops = res;
				console.log(res);
			});
	}
}
