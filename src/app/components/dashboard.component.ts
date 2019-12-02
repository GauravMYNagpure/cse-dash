import { Component, OnInit, OnChanges, SimpleChanges } from "@angular/core";
import { TitleCasePipe } from "@angular/common";

import { Chart } from "angular-highcharts";
import { sampleData } from "../shared";

@Component({
  selector: "dashboard",
  templateUrl: "../pages/dashboard.component.html",
  styleUrls: ["../styles/dashboard.component.css"],
  providers: [TitleCasePipe]
})
export class DashboardComponent implements OnInit, OnChanges {
  constructor(private titlecasePipe: TitleCasePipe) {}
  name = "Gaurav";
  dates: any = {};
  charts: any = [];
  ngOnInit() {
    let defaultDate = new Date();
    this.dates["endDate"] = defaultDate;
    this.dates["startDate"] = new Date(defaultDate);
    this.dates["startDate"].setDate(defaultDate.getDate() - 5);
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    console.log(changes);
    //Add '${implements OnChanges}' to the class.
  }
  printDate(event) {
    // if (this.start) console.log(event);
  }
  // console.log(this.start, this.end);
  // if (this.start && this.end) {
  //   console.log("calling me");
  //   this.filterChartByDate(this.start, this.end);
  // }/

  generateChart(type, data) {
    let chartFrame = {
      chart: {
        type: type
      },
      credits: {
        enabled: false
      },
      title: {
        text: this.titlecasePipe.transform(type) + " Chart"
      },
      series: []
    };

    data.forEach(dataItem => {
      chartFrame.series.push({
        data: dataItem,
        type: type
      });
    });
    return new Chart(chartFrame);
  }
  getDateFromTimestamp(tmstp: string) {
    return new Date(Number(tmstp));
  }
  // add point to chart serie
  getParsedDateData(data) {
    return data.map(el => [this.getDateFromTimestamp(el[0]), el[1]]);
  }

  addCharts(type) {
    let parsedData = this.getParsedDateData(sampleData);
    this.charts.push(this.generateChart(type, parsedData));
  }

  plotChart(type = undefined) {
    type = type ? type : this.randomChartName();
    this.addCharts(type);
    console.log(this.charts);
  }

  randomChartName(charts = ["line", "bar", "column", "scatter"]) {
    return charts[Math.floor(Math.random() * charts.length)];
  }

  removeChart(i) {
    this.charts.splice(i, 1);
  }

  filterChartByDate(start, end) {}
  saveStatus() {
    console.log(this.getParsedDateData(sampleData));
    console.log("Saving the status of dashboard..");
  }
}
