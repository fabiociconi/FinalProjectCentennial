import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LayoutService {

	private _title = new Subject<string>();

	public get title() {
		return  this._title.asObservable();
	}

	constructor() { }

	public setTitle(title: string): void {
		this._title.next(title);
	}
}
