import { Component, OnInit } from "@angular/core";
import { TitleCasePipe } from "@angular/common";
import { first } from "rxjs/operators";

import { Chart } from "angular-highcharts";
import { sampleData } from "../shared";
import { AuthenticationService, ChartsService } from "../services";

@Component({
  selector: "dashboard",
  templateUrl: "../pages/dashboard.component.html",
  styleUrls: ["../styles/dashboard.component.css"],
  providers: [TitleCasePipe]
})
export class DashboardComponent implements OnInit {
  constructor(
    private titlecasePipe: TitleCasePipe,
    private authService: AuthenticationService,
    private chartService: ChartsService
  ) {}
  loading: boolean = false;
  dateLoading: boolean = false;
  name: string;
  dates: any = {};
  charts: any = [];

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loading = true;
    this.dateLoading = true;

    let userInfo = this.getInfo();
    this.name = userInfo.firstName;
    this.chartService
      .getAllCharts(userInfo.id)
      .pipe(first())
      .subscribe(
        data => {
          if (data) {
            data.charts.forEach(chart => {
              this.addNewChart(chart);
            });
            this.setDatesToObj(data);
          }
          this.loading = false;
          this.dateLoading = false;
        },
        error => {
          this.loading = false;
          this.dateLoading = false;

          console.log(error);
        }
      );
  }
  setDatesToObj(data) {
    this.dates["startDate"] = new Date(data.date_filter.startDate);
    this.dates["endDate"] = new Date(data.date_filter.endDate);
  }
  addNewChart(frame) {
    let chartObj = this.generateChart(frame);
    this.renderCharts(chartObj);
  }

  filterChartsByDate(event) {
    if (event.startDate && event.endDate) {
      this.dates["startDate"] = event.startDate;
      this.dates["endDate"] = event.endDate;

      if (this.charts.length) {
        let data = this.getFilteredChartDataByDate(event);
        let prevChartTypes = this.charts.map(chrt => chrt.options.chart.type);
        this.charts = [];
        prevChartTypes.forEach(type => {
          this.plotChart(data, type);
        });
      }
    }
  }

  getChartFrameData(type, data) {
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
    return chartFrame;
  }

  generateChart(frame) {
    return new Chart(frame);
  }

  getDateFromTimestamp(tmstp: any) {
    if (tmstp instanceof Date) {
      return tmstp;
    }
    return new Date(Number(tmstp));
  }
  // add point to chart serie
  getParsedDateData(data) {
    return data.map(el => [this.getDateFromTimestamp(el[0]), el[1]]);
  }

  renderCharts(chart) {
    this.charts.push(chart);
  }

  plotChart(data = this.getParsedDateData(sampleData), type = undefined) {
    let dates =
      this.dates.startDate && this.dates.endDate ? this.dates : undefined;

    if (dates) {
      //perform only if the dates are set initially.
      data = this.getFilteredChartDataByDate(dates);
    }

    type = type ? type : this.randomChartName();

    let frame = this.getChartFrameData(type, data);
    this.addNewChart(frame);
  }

  randomChartName(charts = ["line", "bar", "column", "scatter"]) {
    return charts[Math.floor(Math.random() * charts.length)];
  }

  removeChart(i) {
    this.charts.splice(i, 1);
  }

  getFilteredChartDataByDate(
    dates,
    smplData = this.getParsedDateData(sampleData)
  ) {
    return smplData.filter(data => {
      if (dates.startDate.constructor.name == "Moment") {
        return (
          data[0] >= dates.startDate.toDate() &&
          data[0] <= dates.endDate.toDate()
        );
      } else {
        return data[0] >= dates.startDate && data[0] <= dates.endDate;
      }
    });
  }

  getInfo(key = "currentUser") {
    let available = localStorage.getItem(key);
    if (!available) {
      return false;
    }
    return JSON.parse(available);
  }

  saveStatus() {
    this.loading = true;
    let currentUserInfo = this.getInfo();
    this.chartService
      .createCharts(
        currentUserInfo.id,
        this.charts.map(chrt => chrt.options),
        this.dates
      )
      .pipe(first())
      .subscribe(
        data => {
          this.loading = false;
        },
        error => {
          this.loading = false;

          console.log(error);
        }
      );
  }
  logout() {
    this.authService.logout();
  }
}
