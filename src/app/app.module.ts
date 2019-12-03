import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxDaterangepickerMd } from "ngx-daterangepicker-material";

import { ChartModule } from "angular-highcharts";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { DashboardComponent, LoginComponent } from "./components";

import {
  fakeBackendProvider,
  JwtInterceptor,
  ErrorInterceptor
} from "./services";

@NgModule({
  declarations: [AppComponent, DashboardComponent, LoginComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ChartModule,
    FormsModule,
    ReactiveFormsModule,

    NgxDaterangepickerMd.forRoot()
  ],

  bootstrap: [AppComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider
  ]
})
export class AppModule {}
