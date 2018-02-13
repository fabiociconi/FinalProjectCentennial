import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs/observable";
import { Subject } from "rxjs/Subject";
import { HttpUtilService } from "xcommon";

const JwtDecode = require("jwt-decode");

import { ISignInEntity, ISignUpEntity, IExecute, ITokenEntity, RoleType } from "../../entity";

interface IKeys {
	Token: string;
	FirstName: string;
	LastName: string;
}

@Injectable()
export class AuthService {

	private Keys: IKeys = {
		Token: "Token",
		FirstName: "FirstName",
		LastName: "LastName"
	};

	private Token: string = null;
	private ServiceUrl = "account";
	private _Role: RoleType;

	private LoginChangeSubject = new Subject<boolean>();
	public LoginChange = this.LoginChangeSubject.asObservable();
	public get Role(): RoleType { return this._Role; }

	constructor(private utilService: HttpUtilService, private http: HttpClient, private router: Router) {
		this.Token = localStorage.getItem(this.Keys.Token);
		this.LoadRole();
	}

	public IsAuthenticated(): boolean {
		return this.Token !== null;
	}

	public GetKeys(): IKeys {
		return {
			FirstName: localStorage.getItem(this.Keys.FirstName),
			LastName: localStorage.getItem(this.Keys.LastName),
			Token: localStorage.getItem(this.Keys.Token)
		};
	}

	public GetAuthorizationHeader(): string {
		return `Bearer ${this.Token}`;
	}

	public SignOut(): void {
		this.SetKeys(null);
		this.router.navigate(["/"]);

	}

	public SignIn(signIn: ISignInEntity): Observable<IExecute<ITokenEntity>> {
		const url = this.utilService.BuidlUrl(this.ServiceUrl, "signin");
		const result = this.http.post<IExecute<ITokenEntity>>(url, signIn)
			.share();

		result
			.subscribe(c => {

				if (!c.HasErro) {
					this.SetKeys(c.Entity);
					this.InitialRedirect();
				}
			});

		return result;
	}

	public InitialRedirect(): void {
		if (this.Role === RoleType.Admin) {
			this.router.navigate(["/admin"]);
		}

		if (this.Role === RoleType.Customer) {
			this.router.navigate(["/customer"]);
		}

		if (this.Role === RoleType.Workshop) {
			this.router.navigate(["/workshop"]);
		}
	}

	public SignUp(signUp: ISignUpEntity): Observable<IExecute<ITokenEntity>> {
		const url = this.utilService.BuidlUrl(this.ServiceUrl, "signup");
		const result = this.http.post<IExecute<ITokenEntity>>(url, signUp)
			.share();

		result
			.subscribe(c => {
				if (!c.HasErro) {
					this.SetKeys(c.Entity);
					this.InitialRedirect();
				}
			});

		return result;
	}

	private SetKeys(entity: ITokenEntity): void {

		if (!entity) {
			localStorage.removeItem(this.Keys.Token);
			localStorage.removeItem(this.Keys.FirstName);
			localStorage.removeItem(this.Keys.LastName);

			this.Token = null;
			this.LoadRole();
			this.LoginChangeSubject.next(this.IsAuthenticated());
			return;
		}

		localStorage.setItem(this.Keys.Token, entity.Token);
		localStorage.setItem(this.Keys.FirstName, entity.FirstName);
		localStorage.setItem(this.Keys.LastName, entity.LastName);

		this.Token = entity.Token;
		this.LoadRole();
		this.LoginChangeSubject.next(this.IsAuthenticated());
	}

	private LoadRole(): void {

		if (this.Token) {

			const token = JwtDecode(this.Token);
			const role = token["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

			switch (role) {
				case "Admin":
					this._Role = RoleType.Admin;
					break;
				case "Customer":
					this._Role = RoleType.Customer;
					break;
				case "Workshop":
					this._Role = RoleType.Workshop;
					break;
				default:
					this._Role = null;
					break;
			}

			return;
		}

		this._Role = null;
	}
}