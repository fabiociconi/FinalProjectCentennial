import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./modules/app.module";

declare var module: any;

if (module.hot) {
	module.hot.accept();
}

platformBrowserDynamic().bootstrapModule(AppModule);