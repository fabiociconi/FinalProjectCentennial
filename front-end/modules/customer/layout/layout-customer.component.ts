import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../service";

@Component({
	selector: "layout-customer",
	templateUrl: "./layout-customer.html",
	styleUrls: ["./layout-customer.scss"]
})
export class LayoutCustomerComponent implements OnInit {
	public UserName = localStorage.FirstName + " " + localStorage.LastName;
	public SideNavMode = "side";
	public SideNavOpen = true;

	constructor(private authService: AuthService) { }

	public ngOnInit(): void { }

	public SignOut(): void {
		this.authService.SignOut();
	}
}
