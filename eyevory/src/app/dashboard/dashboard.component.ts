import { Component, OnInit, QueryList, ViewChildren } from "@angular/core";
import { ChartDataset, ChartOptions } from "chart.js";
import { BaseChartDirective } from "ng2-charts";

import io from "socket.io-client";

const socket = io("http://localhost:3000");

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  @ViewChildren(BaseChartDirective) charts: QueryList<BaseChartDirective>;

  public lineChartOptions1: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  public lineChartLabels1: any[] = ["", "", "", "", ""];
  public lineChartPlugins1 = [];
  public lineChartData1: ChartDataset[] = [
    {
      data: [10, 30, 50, 70, 100],
      label: "First Dataset",
      type: "line",
      backgroundColor: "rgba(255,0,255,0.4)",
      borderColor: "rgba(255,0,255,0.4)",
      tension: 0.2,
    },
    // {
    //   data: [243, 156, 365, 30, 156, 265, 356, 543].reverse(),
    //   label: "Second Dataset",
    //   type: "bar",
    //   backgroundColor: "rgba(0,0,255,0.4)",
    //   borderColor: "rgba(0,0,255,0.4)",
    // },
  ];

  public lineChartOptions2: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  public lineChartLabels2: any[] = ["", "", "", "", ""];
  public lineChartPlugins2 = [];
  public lineChartData2: ChartDataset[] = [
    {
      data: [10, 30, 50, 70, 100],
      label: "First Dataset",
      type: "line",
      backgroundColor: "rgba(255,0,255,0.4)",
      borderColor: "rgba(255,0,255,0.4)",
      tension: 0.2,
    },
  ];

  public lineChartOptions3: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  public lineChartLabels3: any[] = ["", "", "", "", ""];
  public lineChartPlugins3 = [];
  public lineChartData3: ChartDataset[] = [
    {
      data: [10, 30, 50, 70, 100],
      label: "First Dataset",
      type: "line",
      backgroundColor: "rgba(255,0,255,0.4)",
      borderColor: "rgba(255,0,255,0.4)",
      tension: 0.2,
    },
  ];

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: any[] = ["a", "b", "c"];
  public pieChartData: ChartDataset[] = [
    { data: [243, 156, 365], label: "Some Chart idk" },
  ];

  currentQuery: string;
  currentQueryResults: string;
  pastQueries: string[];

  ngOnInit() {
    socket.on("data1", (res) => {
      console.log("data1");
      console.log(res);
      this.updateChartData(this.charts, res, 0);
      // this.updatePieChartData(this.charts[0], res, 0);
    });

    // socket.on("data2", (res) => {
    //   console.log("data2");
    //   console.log(res);
    //   this.updateChartData(this.charts, res, 1);
    // });
  }

  constructor() {
    this.pastQueries = [];
    this.currentQuery = "";
    this.currentQueryResults = "";
  }

  processQuery() {
    if (this.currentQuery != "") {
      this.pastQueries.push(this.currentQuery);
      this.currentQuery = "";
      console.log(this.pastQueries);
    }
  }

  addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
      dataset.data.push(data);
    });
    chart.update();
  }

  removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
      dataset.data.pop();
    });
    chart.update();
  }

  updateChartData(chart, data, dataSetIndex) {
    console.log("ggg");
    let i=0;
    this.charts.forEach((child) => {
      console.log(i);
      if (i==0) {
        child.chart.data.datasets[0].data.push(data[0]);
        child.chart.data.labels.push("");
        if (child.chart.data.datasets[0].data.length > 10) {
          child.chart.data.labels.shift();
          child.chart.data.datasets[0].data.shift();
        }
      } 
      else if (i==1) {
        child.chart.data.datasets[0].data.push(data[1]);
        child.chart.data.labels.push("");
        if (child.chart.data.datasets[0].data.length > 10) {
          child.chart.data.labels.shift();
          child.chart.data.datasets[0].data.shift();
        }
      }
      else if (i==2) {
        child.chart.data.datasets[0].data.push(data[2]);
        child.chart.data.labels.push("");
        if (child.chart.data.datasets[0].data.length > 10) {
          child.chart.data.labels.shift();
          child.chart.data.datasets[0].data.shift();
        }
      }
      else if (i==3) {
        child.chart.data.datasets[dataSetIndex].data = data;
      }
      child.chart.update();
      i++;
    });
  }
}
