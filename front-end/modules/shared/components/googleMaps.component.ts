import { Component, ElementRef, NgZone, ViewChild, Output, EventEmitter, Input } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { AgmCoreModule, MapsAPILoader } from "@agm/core";

import { IAddressesEntity, EntityAction, AddressType } from "../../../entity";
import { Guid } from "../../../entity/entity-util";

@Component({
	selector: "googleMaps",
	templateUrl: "./googleMaps.html"
})
export class GoogleMaps {
	@Input()
	private addressIn: IAddressesEntity;

	@Output() addressOut: EventEmitter<IAddressesEntity> = new EventEmitter();

	public Workshop: IAddressesEntity;

	@ViewChild("search")
	public searchElementRef: ElementRef;

	public lat: number = 0;
	public lng: number = 0;
	public zoom: number = 4;

	constructor(
		private mapsAPILoader: MapsAPILoader,
		private ngZone: NgZone
	) { }

	public ngOnInit(): void {
		//google Maps
		this.lat = this.addressIn.Latitude;
		this.lng = this.addressIn.Longitude;

		this.mapsAPILoader.load().then(() => {
			if (this.lat == 0 && this.lng == 0) {
				this.SetCurrentPosition();
			}

			this.Workshop = this.addressIn;

			const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
				types: ["address"]
			});

			autocomplete.addListener("place_changed", () => {
				this.ngZone.run(() => {

					const place: google.maps.places.PlaceResult = autocomplete.getPlace();

					//verify result
					if (place.geometry === undefined || place.geometry === null) {
						return;
					}

					this.ParseAddress(place.address_components, place.geometry.location.lat(), place.geometry.location.lng());
				});
			});
		});
	}

	private SetCurrentPosition() {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(position => {
				this.lat = position.coords.latitude;
				this.lng = position.coords.longitude;
				this.zoom = 4;

				var latlng = {lat: this.lat, lng: this.lng };			
				this.MarkerDragEnd({ "coords": latlng });
			});

		}
	}

	private ParseAddress(components: google.maps.GeocoderAddressComponent[], lat: number, lng: number): void {
		this.lat = lat;
		this.lng = lng;

		const streetNumber = this.GetAddressComponent(components, "street_number", false);
		const street = this.GetAddressComponent(components, "route", false);
		const city = this.GetAddressComponent(components, "locality", false);
		const province = this.GetAddressComponent(components, "administrative_area_level_1", false);
		const country = this.GetAddressComponent(components, "country", false);
		const postalCode = this.GetAddressComponent(components, "postal_code", false);

		this.Workshop.StreetNumber = streetNumber;
		this.Workshop.Street = street;
		this.Workshop.City = city;
		this.Workshop.Province = province;
		this.Workshop.Country = country;
		this.Workshop.PostalCode = postalCode;
		this.Workshop.Latitude = lat;
		this.Workshop.Longitude = lng;

		//console.log(`${streetNumber} ${street}, ${city}, ${province}, ${country} -> ${postalCode}`);
		this.addressOut.emit(this.Workshop);
	}

	private GetAddressComponent(address: google.maps.GeocoderAddressComponent[], component: string, typeShort: boolean): string {
		let element = "";

		address.forEach(address_component => {
			if (address_component.types[0] == component) {
				element = typeShort ? address_component.short_name : address_component.long_name;
			}
		});

		return element;
	}

	public MarkerDragEnd(event: any) {
		const geocoder = new google.maps.Geocoder();

		geocoder.geocode({ location: event.coords }, (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
			if (status === google.maps.GeocoderStatus.OK && results[0]) {
				this.ParseAddress(results[0].address_components, event.coords.lat, event.coords.lng);
			}
		});
	}
}
