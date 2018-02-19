import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SingInEntity } from '../../../entity';


@Injectable()
export class AuthService {

	constructor(private http: HttpClient) {
	}
}
