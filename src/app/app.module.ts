import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HttpClientJsonpModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { ChartModule } from "angular-highcharts";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import {
  DashboardComponent,
  LoginComponent,
  LogoutComponent
} from "./components";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientJsonpModule,
    AppRoutingModule,
    ChartModule,
    FormsModule,
    NgbModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
