import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import {
  DashboardComponent,
  LoginComponent,
  LogoutComponent
} from "./components";

const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "logout",
    component: LogoutComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
