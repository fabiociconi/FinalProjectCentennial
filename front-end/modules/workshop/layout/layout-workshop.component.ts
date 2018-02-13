import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../service";

@Component({
	selector: "layout-workshop",
	templateUrl: "./layout-workshop.html",
	styleUrls: ["./layout-workshop.scss"]
})
export class LayoutWorkshopComponent implements OnInit {
	public UserName = localStorage.FirstName + " " + localStorage.LastName;
	public SideNavMode = "side";
	public SideNavOpen = true;

	constructor(private authService: AuthService) { }

	public ngOnInit(): void { }

	public SignOut(): void {
		this.authService.SignOut();
	}
}
