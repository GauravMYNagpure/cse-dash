import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { delay, mergeMap, materialize, dematerialize } from "rxjs/operators";

import { Users } from "../shared";

// array in local storage for registered users
@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method, headers, body, params } = request;
    // wrap in delayed observable to simulate server api call
    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        case url.endsWith("/users/authenticate") && method === "POST":
          return authenticate();
        case url.endsWith("/charts") && method === "POST":
          return add_charts();
        case url.endsWith("/charts") && method === "GET":
          return get_user_charts();
        default:
          return next.handle(request);
      }
    }

    // route functions

    function authenticate() {
      const { username, password } = body;
      const user = Users.find(
        x => x.username === username && x.password === password
      );
      if (!user) return error("Username or password is incorrect");
      return ok({
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        token: "fake-jwt-token"
      });
    }

    function add_charts() {
      const { charts, date_filter, user } = body;
      let records = getJson(localStorage.getItem("records"));

      localStorage.removeItem("records");

      records[user] = {};
      records[user].charts = charts;
      records[user].date_filter = date_filter;

      localStorage.setItem("records", JSON.stringify(records));

      return created({
        id: user,
        charts: charts,
        date_filter: date_filter
      });
      // saved_charts[]
    }

    function get_user_charts() {
      const user = params.get("user");
      if (user) {
        const records = getJson(localStorage.getItem("records"));
        return ok(records[user]);
      } else {
        error("user id required");
      }
    }
    // helper functions

    function getJson(jsonstring) {
      return JSON.parse(jsonstring || "{}");
    }
    function ok(body?) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function created(body?) {
      return of(new HttpResponse({ status: 201, body }));
    }

    function error(message) {
      return throwError({ error: { message } });
    }
  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
