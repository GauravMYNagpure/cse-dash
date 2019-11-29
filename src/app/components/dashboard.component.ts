import { Component, OnInit } from "@angular/core";

@Component({
  selector: "dashboard",
  templateUrl: "../pages/dashboard.component.html",
  styleUrls: ["../styles/dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  constructor() {}
  name: string = "Gaurav";
  ngOnInit() {}
}
