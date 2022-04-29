import { Component, OnInit, QueryList, ViewChildren } from "@angular/core";
import { MatSliderChange } from "@angular/material/slider";
import { ChartDataset, ChartOptions } from "chart.js";
import { BaseChartDirective } from "ng2-charts";

import io from "socket.io-client";
import { PanelService } from "../services/panel.service";
import { ThreshService } from "../services/thresh.service";

const socket = io("http://localhost:3000");

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  @ViewChildren(BaseChartDirective) charts: QueryList<BaseChartDirective>;

  pieChartColors = ["#FCD900", "#E8630A", "#4700D8", "#4B7BE5", "#006E7F"]

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
      data: [0, 0, 0, 0, 0],
      label: "CPU System",
      type: "line",
      backgroundColor: "#FF85B3",
      borderColor: "#FF85B3",
      tension: 0.3,
    },
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
      data: [0, 0, 0, 0, 0],
      label: "CPU User",
      type: "line",
      backgroundColor: "#FF85B3",
      borderColor: "#FF85B3",
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
      data: [0, 0, 0, 0, 0],
      label: "CPU Idle",
      type: "line",
      backgroundColor: "#FF85B3",
      borderColor: "#FF85B3",
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
      data: [0, 0, 0, 0, 0],
      label: "CPU I/O Wait",
      type: "line",
      backgroundColor: "#FF85B3",
      borderColor: "#FF85B3",
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
      data: [0, 0, 0, 0, 0],
      label: "Memory Active",
      type: "line",
      backgroundColor: "#4700D8",
      borderColor: "#4700D8",
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
      data: [0, 0, 0, 0, 0],
      label: "Memory Inactive",
      type: "line",
      backgroundColor: "#4700D8",
      borderColor: "#4700D8",
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
      data: [0, 0, 0, 0, 0],
      label: "Memory Available",
      type: "line",
      backgroundColor: "#4700D8",
      borderColor: "#4700D8",
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
      data: [0, 0, 0, 0, 0],
      label: "Memory Used",
      type: "line",
      backgroundColor: "#4700D8",
      borderColor: "#4700D8",
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
      data: [0, 0, 0, 0, 0],
      label: "Memory Dirty",
      type: "line",
      backgroundColor: "#4700D8",
      borderColor: "#4700D8",
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
      data: [0, 0, 0, 0, 0],
      label: "Processes Total",
      type: "line",
      backgroundColor: "#9900F0",
      borderColor: "#9900F0",
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
      data: [0, 0, 0, 0, 0],
      label: "Processes Running",
      type: "line",
      backgroundColor: "#9900F0",
      borderColor: "#9900F0",
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
      data: [0, 0, 0, 0, 0],
      label: "Processes Sleeping",
      type: "line",
      backgroundColor: "#9900F0",
      borderColor: "#9900F0",
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
      data: [0, 0, 0, 0, 0],
      label: "Proceeses Zombies",
      type: "line",
      backgroundColor: "#9900F0",
      borderColor: "#9900F0",
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
      data: [0, 0, 0, 0, 0],
      label: "Processes Idle",
      type: "line",
      backgroundColor: "#9900F0",
      borderColor: "#9900F0",
      tension: 0.3,
    },
  ];

  public pieChartOptions1: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "CPU distribution in last reading",
      },
    },
  };
  public pieChartLabels1: any[] = ["system", "user", "idle", "iowait"];
  public pieChartData1: ChartDataset[] = [
    { data: [0, 0, 0, 0], label: "CPU distribution in last reading", backgroundColor:  this.pieChartColors},
  ];

  public pieChartOptions2: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Memory usage in last reading",
      },
    },
  };
  public pieChartLabels2: any[] = [
    "active",
    "inactive",
    "available",
    "used",
    "dirty",
  ];
  public pieChartData2: ChartDataset[] = [
    { data: [0, 0, 0, 0, 0], label: "Memory usage in last reading", backgroundColor:  this.pieChartColors},
  ];

  public pieChartOptions3: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Processes distribution in last reading",
      },
    },
  };
  public pieChartLabels3: any[] = ["running", "sleeping", "zombies", "idle"];
  public pieChartData3: ChartDataset[] = [
    { data: [0, 0, 0, 0, 0], label: "Processes distribution in last reading", backgroundColor:  this.pieChartColors},
  ];

  currentQuery: string;
  currentQueryResults: string;
  pastQueries: string[];
  queryCounter: number;
  cpu_threshold: number;
  mem_avail_threshold: number;
  threshNotChanged: boolean;
  alerts: any;

  ngOnInit() {
    socket.on("cpu_data", (res) => {
      console.log("cpu_data");
      console.log(res);
      this.updateChartDataCPU(this.charts, res, 0);
    });
    socket.on("mem_data", (res) => {
      console.log("mem_data");
      console.log(res);
      this.updateChartDataMem(this.charts, res, 0);
    });
    socket.on("processes_data", (res) => {
      console.log("processes_data");
      console.log(res);
      this.updateChartDataProc(this.charts, res, 0);
    });
    socket.on("alerts", (res) => {
      console.log("alerts");
      console.log(res);
      this.addAlert(res);
    });

    this.threshService.getThresholds().subscribe(
      (res) => {
        this.cpu_threshold = res.cpu_idle_threshold;
        this.mem_avail_threshold = res.mem_available_threshold;
    },
      (error) => {
        console.log(error);
      });
  }

  constructor(
    private panel: PanelService,
    private threshService: ThreshService
  ) {
    this.pastQueries = [];
    this.currentQuery = "";
    this.currentQueryResults = "";
    this.queryCounter = 0;
    this.cpu_threshold = 90;
    this.mem_avail_threshold = 1;
    this.threshNotChanged = true;
    this.alerts = [];
  }

  processQuery() {
    this.queryCounter = this.pastQueries.length + 1;
    if (this.currentQuery != "") {
      this.pastQueries.push(this.currentQuery);
      console.log(this.pastQueries);
      console.log(this.currentQuery);
      this.panel.getQueryData(this.currentQuery).subscribe(
        (response) => {
          console.log(response);
          this.currentQueryResults = JSON.stringify(response);
          this.currentQuery = "";
        },
        (error) => {
          console.log(error);
          this.currentQuery = "";
        }
      );
    }
  }

  addAlert(alertData) {
    if (alertData.cpu_idle_warning == true)
      this.alerts.push({"title": "normal", "message": "CPU too much IDLE"});
    if (alertData.mem_available_low_warning == true)
      this.alerts.push({"title": "danger", "message": "Memory availability low"});
    if (alertData.mem_available_low_warning == false && alertData.time_mem_threshold_cross > 0 && alertData.time_mem_threshold_cross < 1000)
      this.alerts.push({"title": "danger", "message": "Memory availability predicted to be low in " + alertData.time_mem_threshold_cross + " seconds"});
    console.log(this.alerts);
  }

  getPastQuery() {
    if (this.queryCounter > 0) {
      this.queryCounter--;
      this.currentQuery = this.pastQueries[this.queryCounter];
    }
  }

  getNextQuery() {
    if (this.queryCounter < this.pastQueries.length - 1) {
      this.queryCounter++;
      this.currentQuery = this.pastQueries[this.queryCounter];
    } else if (this.queryCounter == this.pastQueries.length - 1) {
      this.queryCounter++;
      this.currentQuery = "";
    } else {
      this.currentQuery = "";
    }
  }

  onInputChange(event: MatSliderChange) {
    this.threshNotChanged = false;
  }

  updateThresholds() {
    this.threshNotChanged = true;
    this.threshService
      .updateThresholds(this.cpu_threshold, this.mem_avail_threshold)
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
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
        child.chart.update();
      } else if (i == 1) {
        child.chart.data.datasets[0].data.push(data["user"]);
        child.chart.data.labels.push("");
        if (child.chart.data.datasets[0].data.length > 10) {
          child.chart.data.labels.shift();
          child.chart.data.datasets[0].data.shift();
        }
        child.chart.update();
      } else if (i == 2) {
        child.chart.data.datasets[0].data.push(data["idle"]);
        child.chart.data.labels.push("");
        if (child.chart.data.datasets[0].data.length > 10) {
          child.chart.data.labels.shift();
          child.chart.data.datasets[0].data.shift();
        }
        child.chart.update();
      } else if (i == 3) {
        child.chart.data.datasets[0].data.push(data["iowait"]);
        child.chart.data.labels.push("");
        if (child.chart.data.datasets[0].data.length > 10) {
          child.chart.data.labels.shift();
          child.chart.data.datasets[0].data.shift();
        }
      } else if (i == 4) {
        let data_list = [
          data["system"],
          data["user"],
          data["idle"],
          data["iowait"],
        ];
        child.chart.data.datasets[dataSetIndex].data = data_list;
        child.chart.update();
      }
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
          child.chart.update();
        }
      } else if (i == 6) {
        child.chart.data.datasets[0].data.push(data["inactive"]);
        child.chart.data.labels.push("");
        if (child.chart.data.datasets[0].data.length > 10) {
          child.chart.data.labels.shift();
          child.chart.data.datasets[0].data.shift();
        }
        child.chart.update();
      } else if (i == 7) {
        child.chart.data.datasets[0].data.push(data["available"]);
        child.chart.data.labels.push("");
        if (child.chart.data.datasets[0].data.length > 10) {
          child.chart.data.labels.shift();
          child.chart.data.datasets[0].data.shift();
        }
        child.chart.update();
      } else if (i == 8) {
        child.chart.data.datasets[0].data.push(data["used"]);
        child.chart.data.labels.push("");
        if (child.chart.data.datasets[0].data.length > 10) {
          child.chart.data.labels.shift();
          child.chart.data.datasets[0].data.shift();
        }
        child.chart.update();
      } else if (i == 9) {
        child.chart.data.datasets[0].data.push(data["dirty"]);
        child.chart.data.labels.push("");
        if (child.chart.data.datasets[0].data.length > 10) {
          child.chart.data.labels.shift();
          child.chart.data.datasets[0].data.shift();
        }
        child.chart.update();
      } else if (i == 10) {
        let data_list = [
          data["active"],
          data["inactive"],
          data["available"],
          data["used"],
          data["dirty"],
        ];
        child.chart.data.datasets[dataSetIndex].data = data_list;
        child.chart.update();
      }
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
        child.chart.update();
      } else if (i == 12) {
        child.chart.data.datasets[0].data.push(data["running"]);
        child.chart.data.labels.push("");
        if (child.chart.data.datasets[0].data.length > 10) {
          child.chart.data.labels.shift();
          child.chart.data.datasets[0].data.shift();
        }
        child.chart.update();
      } else if (i == 13) {
        child.chart.data.datasets[0].data.push(data["sleeping"]);
        child.chart.data.labels.push("");
        if (child.chart.data.datasets[0].data.length > 10) {
          child.chart.data.labels.shift();
          child.chart.data.datasets[0].data.shift();
        }
        child.chart.update();
      } else if (i == 14) {
        child.chart.data.datasets[0].data.push(data["zombies"]);
        child.chart.data.labels.push("");
        if (child.chart.data.datasets[0].data.length > 10) {
          child.chart.data.labels.shift();
          child.chart.data.datasets[0].data.shift();
        }
        child.chart.update();
      } else if (i == 15) {
        child.chart.data.datasets[0].data.push(data["idle"]);
        child.chart.data.labels.push("");
        if (child.chart.data.datasets[0].data.length > 10) {
          child.chart.data.labels.shift();
          child.chart.data.datasets[0].data.shift();
        }
        child.chart.update();
      } else if (i == 16) {
        let data_list = [
          data["running"],
          data["sleeping"],
          data["zombies"],
          data["idle"],
        ];
        child.chart.data.datasets[dataSetIndex].data = data_list;
        child.chart.update();
      }
      i++;
    });
  }
}
