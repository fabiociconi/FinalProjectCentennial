import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { IconService } from "../../service/icon.service";

@Component({
	selector: 'icon',
	template: `
	<svg xmlns='http://www.w3.org/2000/svg' [attr.viewBox]='ViewBox' [attr.width]='Size' [attr.height]='Size' [style.vertical-align]='Align' #iconPath>
	</svg>`
})
export class Icon {
	@Input('size') Size = 28;
    @Input('align') Align = 'middle';
	@Input('icon') set Icon(value: string) {
        this.dataContainer.nativeElement.innerHTML = this.xIconService.Shapes[value];
    }

	@ViewChild('iconPath') dataContainer: ElementRef;
    ViewBox = '0 0 24 24';

    constructor(private xIconService: IconService) {
	}
}