import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app",
	template: "<router-outlet root></router-outlet>"
})
export class AppComponent implements OnInit {
    constructor() { }

    ngOnInit(): void {
    }
}
