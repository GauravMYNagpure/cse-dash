import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { IUser } from "../shared";

@Injectable({ providedIn: "root" })
export class ChartsService {
  private currentUserSubject: BehaviorSubject<IUser>;
  public currentUser: Observable<IUser>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<IUser>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): IUser {
    return this.currentUserSubject.value;
  }
  getAllCharts(user) {
    return this.http
      .get<any>(`/charts`, { params: { user } })
      .pipe(
        map(chartobj => {
          return chartobj;
        })
      );
  }
  createCharts(user: number, charts: any[], date_filter: any) {
    return this.http
      .post<any>(`/charts`, { user, charts, date_filter })
      .pipe(
        map(chartobj => {
          return chartobj;
        })
      );
  }
}
