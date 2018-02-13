import { Component, OnInit, Input } from "@angular/core";
import { IWorkshopsEntity, IAddressesEntity } from "../../../entity";

@Component({
	selector: "search-pop-up",
	templateUrl: "./search-pop-up.html",
	styleUrls: ["./search-pop-up.scss"]
})
export class SearchPopUpComponent implements OnInit {

	@Input("workshop")
	public Workshop: IWorkshopsEntity;

	@Input("address")
	public Address: IAddressesEntity;

	constructor() { }

	public ngOnInit(): void { }
}
