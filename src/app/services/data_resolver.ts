// import { Injectable } from "@angular/core";
// import {
//   Resolve,
//   ActivatedRouteSnapshot,
//   RouterStateSnapshot,
//   Route
// } from "@angular/router";
// import { HttpClient } from "@angular/common/http";

// import { Observable } from "rxjs";
// -
// @Injectable()
// export class DataResolver implements Resolve<any> {
//   constructor(private http: HttpClient) {
//     console.log(this.http.jsonp);
//   }
//   //   clbk(data) {
//   //     console.log(data);
//   //     return 0;
//   callback(d) {
//     console.log(d);
//   }
//   resolve(route: ActivatedRouteSnapshot, rstate: RouterStateSnapshot) {
//     return this.http.jsonp(
//       "https://www.highcharts.com/samples/data/aapl-c.json",
//       "callback"
//     ); //   return this.http.get("http://www.highcharts.com/samples/data/aapl-c.json");
//   }
// }
