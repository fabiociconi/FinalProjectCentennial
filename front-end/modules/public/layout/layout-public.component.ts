import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../service";

@Component({
	selector: "layout-public",
	templateUrl: "./layout-public.html",
	styleUrls: ["./layout-public.scss"]
})
export class LayoutPublicComponent implements OnInit {

	public IsAuthenticated = false;
	public Name = "";

	constructor(private authService: AuthService) { }

	public ngOnInit(): void {
		this.authService.LoginChange.subscribe(c => {
			this.IsAuthenticated = c;
			this.CheckName();
		});

		this.IsAuthenticated = this.authService.IsAuthenticated();
		this.CheckName();
	}

	public Redirect(): void {
		this.authService.InitialRedirect();
	}

	private CheckName(): void {
		var keys = this.authService.GetKeys();
		this.Name = keys
			? keys.FirstName
			: "";
	}
}
