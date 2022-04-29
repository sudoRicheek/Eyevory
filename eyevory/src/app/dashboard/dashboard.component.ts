import { Component, OnInit, QueryList, ViewChildren } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { ChartDataset, ChartOptions } from "chart.js";
import { BaseChartDirective } from "ng2-charts";

import io from "socket.io-client";
import { PanelService } from "../services/panel.service";

const socket = io("http://localhost:3000");

type TableElement = {
  result: string;
  table: number;
  _start: string;
  _stop: string;
  _time: string;
  _value: number;
  _field: string;
  _measurement: string;
  host: string;
}

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
      data: [0,0,0,0,0],
      label: "CPU System",
      type: "line",
      backgroundColor: "rgba(255,0,255,0.4)",
      borderColor: "rgba(255,0,255,0.4)",
      tension: 0.3,
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
      data: [0,0,0,0,0],
      label: "CPU User",
      type: "line",
      backgroundColor: "rgba(255,0,255,0.4)",
      borderColor: "rgba(255,0,255,0.4)",
      tension: 0.3,
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
      data: [0,0,0,0,0],
      label: "CPU Idle",
      type: "line",
      backgroundColor: "rgba(255,0,255,0.4)",
      borderColor: "rgba(255,0,255,0.4)",
      tension: 0.3,
    },
  ];

  public lineChartOptions4: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  public lineChartLabels4: any[] = ["", "", "", "", ""];
  public lineChartPlugins4 = [];
  public lineChartData4: ChartDataset[] = [
    {
      data: [0,0,0,0,0],
      label: "CPU I/O Wait",
      type: "line",
      backgroundColor: "rgba(255,0,255,0.4)",
      borderColor: "rgba(255,0,255,0.4)",
      tension: 0.3,
    },
  ];

  public lineChartOptions5: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  public lineChartLabels5: any[] = ["", "", "", "", ""];
  public lineChartPlugins5 = [];
  public lineChartData5: ChartDataset[] = [
    {
      data: [0,0,0,0,0],
      label: "Memory Active",
      type: "line",
      backgroundColor: "rgba(255,0,255,0.4)",
      borderColor: "rgba(255,0,255,0.4)",
      tension: 0.3,
    },
  ];

  public lineChartOptions6: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  public lineChartLabels6: any[] = ["", "", "", "", ""];
  public lineChartPlugins6 = [];
  public lineChartData6: ChartDataset[] = [
    {
      data: [0,0,0,0,0],
      label: "Memory Inactive",
      type: "line",
      backgroundColor: "rgba(255,0,255,0.4)",
      borderColor: "rgba(255,0,255,0.4)",
      tension: 0.3,
    },
  ];

  public lineChartOptions7: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  public lineChartLabels7: any[] = ["", "", "", "", ""];
  public lineChartPlugins7 = [];
  public lineChartData7: ChartDataset[] = [
    {
      data: [0,0,0,0,0],
      label: "Memory Available",
      type: "line",
      backgroundColor: "rgba(255,0,255,0.4)",
      borderColor: "rgba(255,0,255,0.4)",
      tension: 0.3,
    },
  ];

  public lineChartOptions8: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  public lineChartLabels8: any[] = ["", "", "", "", ""];
  public lineChartPlugins8 = [];
  public lineChartData8: ChartDataset[] = [
    {
      data: [0,0,0,0,0],
      label: "Memory Used",
      type: "line",
      backgroundColor: "rgba(255,0,255,0.4)",
      borderColor: "rgba(255,0,255,0.4)",
      tension: 0.3,
    },
  ];

  public lineChartOptions9: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  public lineChartLabels9: any[] = ["", "", "", "", ""];
  public lineChartPlugins9 = [];
  public lineChartData9: ChartDataset[] = [
    {
      data: [0,0,0,0,0],
      label: "Memory Dirty",
      type: "line",
      backgroundColor: "rgba(255,0,255,0.4)",
      borderColor: "rgba(255,0,255,0.4)",
      tension: 0.3,
    },
  ];

  public lineChartOptions10: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  public lineChartLabels10: any[] = ["", "", "", "", ""];
  public lineChartPlugins10 = [];
  public lineChartData10: ChartDataset[] = [
    {
      data: [0,0,0,0,0],
      label: "Processes Total",
      type: "line",
      backgroundColor: "rgba(255,0,255,0.4)",
      borderColor: "rgba(255,0,255,0.4)",
      tension: 0.3,
    },
  ];

  public lineChartOptions11: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  public lineChartLabels11: any[] = ["", "", "", "", ""];
  public lineChartPlugins11 = [];
  public lineChartData11: ChartDataset[] = [
    {
      data: [0,0,0,0,0],
      label: "Processes Running",
      type: "line",
      backgroundColor: "rgba(255,0,255,0.4)",
      borderColor: "rgba(255,0,255,0.4)",
      tension: 0.3,
    },
  ];

  public lineChartOptions12: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  public lineChartLabels12: any[] = ["", "", "", "", ""];
  public lineChartPlugins12 = [];
  public lineChartData12: ChartDataset[] = [
    {
      data: [0,0,0,0,0],
      label: "Processes Sleeping",
      type: "line",
      backgroundColor: "rgba(255,0,255,0.4)",
      borderColor: "rgba(255,0,255,0.4)",
      tension: 0.3,
    },
  ];

  public lineChartOptions13: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  public lineChartLabels13: any[] = ["", "", "", "", ""];
  public lineChartPlugins13 = [];
  public lineChartData13: ChartDataset[] = [
    {
      data: [0,0,0,0,0],
      label: "Proceeses Zombies",
      type: "line",
      backgroundColor: "rgba(255,0,255,0.4)",
      borderColor: "rgba(255,0,255,0.4)",
      tension: 0.3,
    },
  ];

  public lineChartOptions14: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  public lineChartLabels14: any[] = ["", "", "", "", ""];
  public lineChartPlugins14 = [];
  public lineChartData14: ChartDataset[] = [
    {
      data: [0,0,0,0,0],
      label: "Processes Idle",
      type: "line",
      backgroundColor: "rgba(255,0,255,0.4)",
      borderColor: "rgba(255,0,255,0.4)",
      tension: 0.3,
    },
  ];

  public pieChartOptions1: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels1: any[] = ["system", "user", "idle", "iowait"];
  public pieChartData1: ChartDataset[] = [
    { data: [0, 0, 0, 0], label: "CPU distribution in last reading" },
  ];

  public pieChartOptions2: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels2: any[] = ["active", "inactive", "available", "used", "dirty"];
  public pieChartData2: ChartDataset[] = [
    { data: [0, 0, 0, 0], label: "Memory usage in last reading" },
  ];

  public pieChartOptions3: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels3: any[] = ["total", "running", "sleeping", "zombies", "idle"];
  public pieChartData3: ChartDataset[] = [
    { data: [0, 0, 0, 0], label: "Processes distribution in last reading" },
  ];

  currentQuery: string;
  currentQueryResults: string;
  pastQueries: string[];

  tableSource: any[];
  displayedColumns: any[];
  dataSource: MatTableDataSource<any[]> = new MatTableDataSource<any[]>([]);

  isLoaded: boolean;

  ngOnInit() {
    socket.on("cpu_data", (res) => {
      console.log("cpu_data");
      console.log(res);
      this.updateChartDataCPU(this.charts, res, 0);
      // this.updatePieChartData(this.charts[0], res, 0);
    });
    socket.on("mem_data", (res) => {
      console.log("mem_data");
      console.log(res);
      this.updateChartDataMem(this.charts, res, 0);
      // this.updatePieChartData(this.charts[0], res, 0);
    });
    socket.on("processes_data", (res) => {
      console.log("processes_data");
      console.log(res);
      this.updateChartDataProc(this.charts, res, 0);
      // this.updatePieChartData(this.charts[0], res, 0);
    });

    // socket.on("data2", (res) => {
    //   console.log("data2");
    //   console.log(res);
    //   this.updateChartData(this.charts, res, 1);
    // });
  }

  constructor(private panel: PanelService) {
    this.pastQueries = [];
    this.currentQuery = "";
    this.currentQueryResults = "";
  }

  processQuery() {
    if (this.currentQuery != "") {
      this.pastQueries.push(this.currentQuery);
      console.log(this.pastQueries);
      console.log(this.currentQuery);
      this.panel.getQueryData(this.currentQuery).subscribe(
        (response) => {
          console.log(response);
          var response2 = JSON.parse(response);
          console.log(response2);
          this.tableSource = [];
          response2.forEach((roww: any) => {
            roww['records'].forEach((row: any) => {
              this.tableSource.push({
                result: row.values.result,
                table: row.values.table,
                _start: row.values._start,
                _stop: row.values._stop,
                _time: row.values._time,
                _value: row.values._value,
                _field: row.values._field,
                _measurement: row.values._measurement,
                host: row.values.host
              });
            });
          });
          this.displayedColumns = ['result', 'table', '_start', '_stop', '_time', '_value', '_field', '_measurement', 'host'];
          this.dataSource = new MatTableDataSource(this.tableSource);
          this.isLoaded = true;
        },
        (error) => console.log(error)
      );
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

  updateChartDataCPU(chart, data, dataSetIndex) {
    console.log("ggg");
    let i = 0;
    this.charts.forEach((child) => {
      console.log(i);
      if (i == 0) {
        child.chart.data.datasets[0].data.push(data["system"]);
        child.chart.data.labels.push("");
        if (child.chart.data.datasets[0].data.length > 10) {
          child.chart.data.labels.shift();
          child.chart.data.datasets[0].data.shift();
        }
      } else if (i == 1) {
        child.chart.data.datasets[0].data.push(data["user"]);
        child.chart.data.labels.push("");
        if (child.chart.data.datasets[0].data.length > 10) {
          child.chart.data.labels.shift();
          child.chart.data.datasets[0].data.shift();
        }
      } else if (i == 2) {
        child.chart.data.datasets[0].data.push(data["idle"]);
        child.chart.data.labels.push("");
        if (child.chart.data.datasets[0].data.length > 10) {
          child.chart.data.labels.shift();
          child.chart.data.datasets[0].data.shift();
        }
      } else if (i == 3) {
        child.chart.data.datasets[0].data.push(data["iowait"]);
        child.chart.data.labels.push("");
        if (child.chart.data.datasets[0].data.length > 10) {
          child.chart.data.labels.shift();
          child.chart.data.datasets[0].data.shift();
        }
      } else if (i == 4) {
        let data_list = [data["system"], data["user"], data["idle"], data["iowait"]];
        child.chart.data.datasets[dataSetIndex].data = data_list;
      }
      child.chart.update();
      i++;
    });
  }

  updateChartDataMem(chart, data, dataSetIndex) {
    console.log("ggg");
    let i = 0;
    this.charts.forEach((child) => {
      console.log(i);
      if (i == 5) {
        child.chart.data.datasets[0].data.push(data["active"]);
        child.chart.data.labels.push("");
        if (child.chart.data.datasets[0].data.length > 10) {
          child.chart.data.labels.shift();
          child.chart.data.datasets[0].data.shift();
        }
      } else if (i == 6) {
        child.chart.data.datasets[0].data.push(data["inactive"]);
        child.chart.data.labels.push("");
        if (child.chart.data.datasets[0].data.length > 10) {
          child.chart.data.labels.shift();
          child.chart.data.datasets[0].data.shift();
        }
      } else if (i == 7) {
        child.chart.data.datasets[0].data.push(data["available"]);
        child.chart.data.labels.push("");
        if (child.chart.data.datasets[0].data.length > 10) {
          child.chart.data.labels.shift();
          child.chart.data.datasets[0].data.shift();
        }
      } else if (i == 8) {
        child.chart.data.datasets[0].data.push(data["used"]);
        child.chart.data.labels.push("");
        if (child.chart.data.datasets[0].data.length > 10) {
          child.chart.data.labels.shift();
          child.chart.data.datasets[0].data.shift();
        }
      } else if (i == 9) {
        child.chart.data.datasets[0].data.push(data["dirty"]);
        child.chart.data.labels.push("");
        if (child.chart.data.datasets[0].data.length > 10) {
          child.chart.data.labels.shift();
          child.chart.data.datasets[0].data.shift();
        }
      } else if (i == 10) {
        let data_list = [data["active"], data["inactive"], data["available"], data["used"], data["dirty"]];
        child.chart.data.datasets[dataSetIndex].data = data_list;
      }
      child.chart.update();
      i++;
    });
  }

  updateChartDataProc(chart, data, dataSetIndex) {
    console.log("ggg");
    let i = 0;
    this.charts.forEach((child) => {
      console.log(i);
      if (i == 11) {
        child.chart.data.datasets[0].data.push(data["total"]);
        child.chart.data.labels.push("");
        if (child.chart.data.datasets[0].data.length > 10) {
          child.chart.data.labels.shift();
          child.chart.data.datasets[0].data.shift();
        }
      } else if (i == 12) {
        child.chart.data.datasets[0].data.push(data["running"]);
        child.chart.data.labels.push("");
        if (child.chart.data.datasets[0].data.length > 10) {
          child.chart.data.labels.shift();
          child.chart.data.datasets[0].data.shift();
        }
      } else if (i == 13) {
        child.chart.data.datasets[0].data.push(data["sleeping"]);
        child.chart.data.labels.push("");
        if (child.chart.data.datasets[0].data.length > 10) {
          child.chart.data.labels.shift();
          child.chart.data.datasets[0].data.shift();
        }
      } else if (i == 14) {
        child.chart.data.datasets[0].data.push(data["zombies"]);
        child.chart.data.labels.push("");
        if (child.chart.data.datasets[0].data.length > 10) {
          child.chart.data.labels.shift();
          child.chart.data.datasets[0].data.shift();
        }
      } else if (i == 15) {
        child.chart.data.datasets[0].data.push(data["idle"]);
        child.chart.data.labels.push("");
        if (child.chart.data.datasets[0].data.length > 10) {
          child.chart.data.labels.shift();
          child.chart.data.datasets[0].data.shift();
        }
      } else if (i == 16) {
        let data_list = [data["running"], data["sleeping"], data["zombies"], data["idle"]];
        child.chart.data.datasets[dataSetIndex].data = data_list;
      }
      child.chart.update();
      i++;
    });
  }
}
