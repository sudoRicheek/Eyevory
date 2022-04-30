import { Component, OnInit, QueryList, ViewChildren } from "@angular/core";
import { MatSliderChange } from "@angular/material/slider";
import { MatTableDataSource } from "@angular/material/table";
import { ChartDataset, ChartOptions } from "chart.js";
import { BaseChartDirective } from "ng2-charts";

import io from "socket.io-client";
import { PanelService } from "../services/panel.service";
import { ServersService } from "../services/servers.service";
import { ThreshService } from "../services/thresh.service";

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

  public lineChartOptions15: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  public lineChartLabels15: any[] = ["", "", "", "", ""];
  public lineChartPlugins15 = [];
  public lineChartData15: ChartDataset[] = [
    {
      data: [0, 0, 0, 0, 0],
      label: "CPU System",
      type: "line",
      backgroundColor: "#FF85B3",
      borderColor: "#FF85B3",
      tension: 0.3,
    },
  ];

  public lineChartOptions16: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  public lineChartLabels16: any[] = ["", "", "", "", ""];
  public lineChartPlugins16 = [];
  public lineChartData16: ChartDataset[] = [
    {
      data: [0, 0, 0, 0, 0],
      label: "CPU User",
      type: "line",
      backgroundColor: "#FF85B3",
      borderColor: "#FF85B3",
      tension: 0.3,
    },
  ];

  public lineChartOptions17: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  public lineChartLabels17: any[] = ["", "", "", "", ""];
  public lineChartPlugins17 = [];
  public lineChartData17: ChartDataset[] = [
    {
      data: [0, 0, 0, 0, 0],
      label: "CPU Idle",
      type: "line",
      backgroundColor: "#FF85B3",
      borderColor: "#FF85B3",
      tension: 0.3,
    },
  ];

  public lineChartOptions18: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  public lineChartLabels18: any[] = ["", "", "", "", ""];
  public lineChartPlugins18 = [];
  public lineChartData18: ChartDataset[] = [
    {
      data: [0, 0, 0, 0, 0],
      label: "CPU I/O Wait",
      type: "line",
      backgroundColor: "#FF85B3",
      borderColor: "#FF85B3",
      tension: 0.3,
    },
  ];

  public lineChartOptions19: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  public lineChartLabels19: any[] = ["", "", "", "", ""];
  public lineChartPlugins19 = [];
  public lineChartData19: ChartDataset[] = [
    {
      data: [0, 0, 0, 0, 0],
      label: "Memory Active",
      type: "line",
      backgroundColor: "#4700D8",
      borderColor: "#4700D8",
      tension: 0.3,
    },
  ];

  public lineChartOptions20: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  public lineChartLabels20: any[] = ["", "", "", "", ""];
  public lineChartPlugins20 = [];
  public lineChartData20: ChartDataset[] = [
    {
      data: [0, 0, 0, 0, 0],
      label: "Memory Inactive",
      type: "line",
      backgroundColor: "#4700D8",
      borderColor: "#4700D8",
      tension: 0.3,
    },
  ];

  public lineChartOptions21: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  public lineChartLabels21: any[] = ["", "", "", "", ""];
  public lineChartPlugins21 = [];
  public lineChartData21: ChartDataset[] = [
    {
      data: [0, 0, 0, 0, 0],
      label: "Memory Available",
      type: "line",
      backgroundColor: "#4700D8",
      borderColor: "#4700D8",
      tension: 0.3,
    },
  ];

  public lineChartOptions22: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  public lineChartLabels22: any[] = ["", "", "", "", ""];
  public lineChartPlugins22 = [];
  public lineChartData22: ChartDataset[] = [
    {
      data: [0, 0, 0, 0, 0],
      label: "Memory Used",
      type: "line",
      backgroundColor: "#4700D8",
      borderColor: "#4700D8",
      tension: 0.3,
    },
  ];

  public lineChartOptions23: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  public lineChartLabels23: any[] = ["", "", "", "", ""];
  public lineChartPlugins23 = [];
  public lineChartData23: ChartDataset[] = [
    {
      data: [0, 0, 0, 0, 0],
      label: "Memory Dirty",
      type: "line",
      backgroundColor: "#4700D8",
      borderColor: "#4700D8",
      tension: 0.3,
    },
  ];

  public lineChartOptions24: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  public lineChartLabels24: any[] = ["", "", "", "", ""];
  public lineChartPlugins24 = [];
  public lineChartData24: ChartDataset[] = [
    {
      data: [0, 0, 0, 0, 0],
      label: "Processes Total",
      type: "line",
      backgroundColor: "#9900F0",
      borderColor: "#9900F0",
      tension: 0.3,
    },
  ];

  public lineChartOptions25: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  public lineChartLabels25: any[] = ["", "", "", "", ""];
  public lineChartPlugins25 = [];
  public lineChartData25: ChartDataset[] = [
    {
      data: [0, 0, 0, 0, 0],
      label: "Processes Running",
      type: "line",
      backgroundColor: "#9900F0",
      borderColor: "#9900F0",
      tension: 0.3,
    },
  ];

  public lineChartOptions26: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  public lineChartLabels26: any[] = ["", "", "", "", ""];
  public lineChartPlugins26 = [];
  public lineChartData26: ChartDataset[] = [
    {
      data: [0, 0, 0, 0, 0],
      label: "Processes Sleeping",
      type: "line",
      backgroundColor: "#9900F0",
      borderColor: "#9900F0",
      tension: 0.3,
    },
  ];

  public lineChartOptions27: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  public lineChartLabels27: any[] = ["", "", "", "", ""];
  public lineChartPlugins27 = [];
  public lineChartData27: ChartDataset[] = [
    {
      data: [0, 0, 0, 0, 0],
      label: "Proceeses Zombies",
      type: "line",
      backgroundColor: "#9900F0",
      borderColor: "#9900F0",
      tension: 0.3,
    },
  ];

  public lineChartOptions28: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  public lineChartLabels28: any[] = ["", "", "", "", ""];
  public lineChartPlugins28 = [];
  public lineChartData28: ChartDataset[] = [
    {
      data: [0, 0, 0, 0, 0],
      label: "Processes Idle",
      type: "line",
      backgroundColor: "#9900F0",
      borderColor: "#9900F0",
      tension: 0.3,
    },
  ];

  public lineChartOptions29: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  public lineChartLabels29: any[] = ["", "", "", "", ""];
  public lineChartPlugins29 = [];
  public lineChartData29: ChartDataset[] = [
    {
      data: [0, 0, 0, 0, 0],
      label: "CPU System",
      type: "line",
      backgroundColor: "#FF85B3",
      borderColor: "#FF85B3",
      tension: 0.3,
    },
  ];

  public lineChartOptions30: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  public lineChartLabels30: any[] = ["", "", "", "", ""];
  public lineChartPlugins30 = [];
  public lineChartData30: ChartDataset[] = [
    {
      data: [0, 0, 0, 0, 0],
      label: "CPU User",
      type: "line",
      backgroundColor: "#FF85B3",
      borderColor: "#FF85B3",
      tension: 0.3,
    },
  ];

  public lineChartOptions31: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  public lineChartLabels31: any[] = ["", "", "", "", ""];
  public lineChartPlugins31 = [];
  public lineChartData31: ChartDataset[] = [
    {
      data: [0, 0, 0, 0, 0],
      label: "CPU Idle",
      type: "line",
      backgroundColor: "#FF85B3",
      borderColor: "#FF85B3",
      tension: 0.3,
    },
  ];

  public lineChartOptions32: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  public lineChartLabels32: any[] = ["", "", "", "", ""];
  public lineChartPlugins32 = [];
  public lineChartData32: ChartDataset[] = [
    {
      data: [0, 0, 0, 0, 0],
      label: "CPU I/O Wait",
      type: "line",
      backgroundColor: "#FF85B3",
      borderColor: "#FF85B3",
      tension: 0.3,
    },
  ];

  public lineChartOptions33: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  public lineChartLabels33: any[] = ["", "", "", "", ""];
  public lineChartPlugins33 = [];
  public lineChartData33: ChartDataset[] = [
    {
      data: [0, 0, 0, 0, 0],
      label: "Memory Active",
      type: "line",
      backgroundColor: "#4700D8",
      borderColor: "#4700D8",
      tension: 0.3,
    },
  ];

  public lineChartOptions34: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  public lineChartLabels34: any[] = ["", "", "", "", ""];
  public lineChartPlugins34 = [];
  public lineChartData34: ChartDataset[] = [
    {
      data: [0, 0, 0, 0, 0],
      label: "Memory Inactive",
      type: "line",
      backgroundColor: "#4700D8",
      borderColor: "#4700D8",
      tension: 0.3,
    },
  ];

  public lineChartOptions35: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  public lineChartLabels35: any[] = ["", "", "", "", ""];
  public lineChartPlugins35 = [];
  public lineChartData35: ChartDataset[] = [
    {
      data: [0, 0, 0, 0, 0],
      label: "Memory Available",
      type: "line",
      backgroundColor: "#4700D8",
      borderColor: "#4700D8",
      tension: 0.3,
    },
  ];

  public lineChartOptions36: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  public lineChartLabels36: any[] = ["", "", "", "", ""];
  public lineChartPlugins36 = [];
  public lineChartData36: ChartDataset[] = [
    {
      data: [0, 0, 0, 0, 0],
      label: "Memory Used",
      type: "line",
      backgroundColor: "#4700D8",
      borderColor: "#4700D8",
      tension: 0.3,
    },
  ];

  public lineChartOptions37: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  public lineChartLabels37: any[] = ["", "", "", "", ""];
  public lineChartPlugins37 = [];
  public lineChartData37: ChartDataset[] = [
    {
      data: [0, 0, 0, 0, 0],
      label: "Memory Dirty",
      type: "line",
      backgroundColor: "#4700D8",
      borderColor: "#4700D8",
      tension: 0.3,
    },
  ];

  public lineChartOptions38: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  public lineChartLabels38: any[] = ["", "", "", "", ""];
  public lineChartPlugins38 = [];
  public lineChartData38: ChartDataset[] = [
    {
      data: [0, 0, 0, 0, 0],
      label: "Processes Total",
      type: "line",
      backgroundColor: "#9900F0",
      borderColor: "#9900F0",
      tension: 0.3,
    },
  ];

  public lineChartOptions39: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  public lineChartLabels39: any[] = ["", "", "", "", ""];
  public lineChartPlugins39 = [];
  public lineChartData39: ChartDataset[] = [
    {
      data: [0, 0, 0, 0, 0],
      label: "Processes Running",
      type: "line",
      backgroundColor: "#9900F0",
      borderColor: "#9900F0",
      tension: 0.3,
    },
  ];

  public lineChartOptions40: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  public lineChartLabels40: any[] = ["", "", "", "", ""];
  public lineChartPlugins40 = [];
  public lineChartData40: ChartDataset[] = [
    {
      data: [0, 0, 0, 0, 0],
      label: "Processes Sleeping",
      type: "line",
      backgroundColor: "#9900F0",
      borderColor: "#9900F0",
      tension: 0.3,
    },
  ];

  public lineChartOptions41: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  public lineChartLabels41: any[] = ["", "", "", "", ""];
  public lineChartPlugins41 = [];
  public lineChartData41: ChartDataset[] = [
    {
      data: [0, 0, 0, 0, 0],
      label: "Proceeses Zombies",
      type: "line",
      backgroundColor: "#9900F0",
      borderColor: "#9900F0",
      tension: 0.3,
    },
  ];

  public lineChartOptions42: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  public lineChartLabels42: any[] = ["", "", "", "", ""];
  public lineChartPlugins42 = [];
  public lineChartData42: ChartDataset[] = [
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

  public pieChartOptions4: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "CPU distribution in last reading",
      },
    },
  };
  public pieChartLabels4: any[] = ["system", "user", "idle", "iowait"];
  public pieChartData4: ChartDataset[] = [
    { data: [0, 0, 0, 0], label: "CPU distribution in last reading", backgroundColor:  this.pieChartColors},
  ];

  public pieChartOptions5: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Memory usage in last reading",
      },
    },
  };
  public pieChartLabels5: any[] = [
    "active",
    "inactive",
    "available",
    "used",
    "dirty",
  ];
  public pieChartData5: ChartDataset[] = [
    { data: [0, 0, 0, 0, 0], label: "Memory usage in last reading", backgroundColor:  this.pieChartColors},
  ];

  public pieChartOptions6: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Processes distribution in last reading",
      },
    },
  };
  public pieChartLabels6: any[] = ["running", "sleeping", "zombies", "idle"];
  public pieChartData6: ChartDataset[] = [
    { data: [0, 0, 0, 0, 0], label: "Processes distribution in last reading", backgroundColor:  this.pieChartColors},
  ];

  public pieChartOptions7: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "CPU distribution in last reading",
      },
    },
  };
  public pieChartLabels7: any[] = ["system", "user", "idle", "iowait"];
  public pieChartData7: ChartDataset[] = [
    { data: [0, 0, 0, 0], label: "CPU distribution in last reading", backgroundColor:  this.pieChartColors},
  ];

  public pieChartOptions8: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Memory usage in last reading",
      },
    },
  };
  public pieChartLabels8: any[] = [
    "active",
    "inactive",
    "available",
    "used",
    "dirty",
  ];
  public pieChartData8: ChartDataset[] = [
    { data: [0, 0, 0, 0, 0], label: "Memory usage in last reading", backgroundColor:  this.pieChartColors},
  ];

  public pieChartOptions9: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Processes distribution in last reading",
      },
    },
  };
  public pieChartLabels9: any[] = ["running", "sleeping", "zombies", "idle"];
  public pieChartData9: ChartDataset[] = [
    { data: [0, 0, 0, 0, 0], label: "Processes distribution in last reading", backgroundColor:  this.pieChartColors},
  ];

  public pieChartOptions10: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "CPU distribution in last reading",
      },
    },
  };
  public pieChartLabels10: any[] = ["system", "user", "idle", "iowait"];
  public pieChartData10: ChartDataset[] = [
    { data: [0, 0, 0, 0], label: "CPU distribution in last reading", backgroundColor:  this.pieChartColors},
  ];

  public pieChartOptions11: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Memory usage in last reading",
      },
    },
  };
  public pieChartLabels11: any[] = [
    "active",
    "inactive",
    "available",
    "used",
    "dirty",
  ];
  public pieChartData11: ChartDataset[] = [
    { data: [0, 0, 0, 0, 0], label: "Memory usage in last reading", backgroundColor:  this.pieChartColors},
  ];

  public pieChartOptions12: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Processes distribution in last reading",
      },
    },
  };
  public pieChartLabels12: any[] = ["running", "sleeping", "zombies", "idle"];
  public pieChartData12: ChartDataset[] = [
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
  hosts: any;

  tableSource: any[];
  displayedColumns: any[];
  dataSource: MatTableDataSource<any[]> = new MatTableDataSource<any[]>([]);

  isLoaded: boolean;

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
    
    socket.on("hosts", (res) => {
      console.log("hosts");
      console.log(res);
      this.hosts = res['hosts'];
    });
  }

  constructor(
    private panel: PanelService,
    private threshService: ThreshService,
  ) {
    this.pastQueries = [];
    this.currentQuery = "";
    this.currentQueryResults = "";
    this.queryCounter = 0;
    this.cpu_threshold = 90;
    this.mem_avail_threshold = 1;
    this.threshNotChanged = true;
    this.alerts = [];
    this.hosts = [];
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
        (error) => {
          console.log(error);
          this.currentQuery = "";
        }
      );
    }
  }

  addAlert(alertData) {
    this.hosts.forEach((host) => {
      if (alertData[host].cpu_idle_warning == true)
        this.alerts.push({"title": "normal", "message": "[" + host + "] CPU too much IDLE"});
      if (alertData[host].mem_available_low_warning == true)
        this.alerts.push({"title": "danger", "message": "[" + host + "] Memory availability low"});
      if (alertData[host].mem_available_low_warning == false && alertData[host].time_mem_threshold_cross > 0 && alertData[host].time_mem_threshold_cross < 1000)
        this.alerts.push({"title": "danger", "message": "[" + host + "] Memory availability predicted to be low in " + alertData[host].time_mem_threshold_cross + " seconds"});
      console.log(this.alerts);
    });
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
      if (i%17 == 0) {
        child.chart.data.datasets[0].data.push(data[this.hosts[Math.floor(i/17)] + "system"] ? data[this.hosts[Math.floor(i/17)] + "system"] : 0);
        child.chart.data.labels.push("");
        if (child.chart.data.datasets[0].data.length > 10) {
          child.chart.data.labels.shift();
          child.chart.data.datasets[0].data.shift();
        }
        child.chart.update();
      } else if (i%17 == 1) {
        child.chart.data.datasets[0].data.push(data[this.hosts[Math.floor(i/17)] + "user"] ? data[this.hosts[Math.floor(i/17)] + "user"] : 0);
        child.chart.data.labels.push("");
        if (child.chart.data.datasets[0].data.length > 10) {
          child.chart.data.labels.shift();
          child.chart.data.datasets[0].data.shift();
        }
        child.chart.update();
      } else if (i%17 == 2) {
        child.chart.data.datasets[0].data.push(data[this.hosts[Math.floor(i/17)] + "idle"] ? data[this.hosts[Math.floor(i/17)] + "idle"] : 0);
        child.chart.data.labels.push("");
        if (child.chart.data.datasets[0].data.length > 10) {
          child.chart.data.labels.shift();
          child.chart.data.datasets[0].data.shift();
        }
        child.chart.update();
      } else if (i%17 == 3) {
        child.chart.data.datasets[0].data.push(0);
        child.chart.data.labels.push("");
        if (child.chart.data.datasets[0].data.length > 10) {
          child.chart.data.labels.shift();
          child.chart.data.datasets[0].data.shift();
        }
      } else if (i%17 == 4) {
        let data_list = [
          data[this.hosts[Math.floor(i/17)]+"system"],
          data[this.hosts[Math.floor(i/17)]+"user"],
          data[this.hosts[Math.floor(i/17)]+"idle"],
          0,
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
      if (i%17 == 5) {
        child.chart.data.datasets[0].data.push(data[this.hosts[Math.floor(i/17)] + "active"] ? data[this.hosts[Math.floor(i/17)] + "active"] : 0);
        child.chart.data.labels.push("");
        if (child.chart.data.datasets[0].data.length > 10) {
          child.chart.data.labels.shift();
          child.chart.data.datasets[0].data.shift();
          child.chart.update();
        }
      } else if (i%17 == 6) {
        child.chart.data.datasets[0].data.push(data[this.hosts[Math.floor(i/17)] + "inactive"] ? data[this.hosts[Math.floor(i/17)] + "inactive"] : 0);
        child.chart.data.labels.push("");
        if (child.chart.data.datasets[0].data.length > 10) {
          child.chart.data.labels.shift();
          child.chart.data.datasets[0].data.shift();
        }
        child.chart.update();
      } else if (i%17 == 7) {
        child.chart.data.datasets[0].data.push(data[this.hosts[Math.floor(i/17)] + "available"] ? data[this.hosts[Math.floor(i/17)] + "available"] : 0);
        child.chart.data.labels.push("");
        if (child.chart.data.datasets[0].data.length > 10) {
          child.chart.data.labels.shift();
          child.chart.data.datasets[0].data.shift();
        }
        child.chart.update();
      } else if (i%17 == 8) {
        child.chart.data.datasets[0].data.push(data[this.hosts[Math.floor(i/17)] + "used"] ? data[this.hosts[Math.floor(i/17)] + "used"] : 0);
        child.chart.data.labels.push("");
        if (child.chart.data.datasets[0].data.length > 10) {
          child.chart.data.labels.shift();
          child.chart.data.datasets[0].data.shift();
        }
        child.chart.update();
      } else if (i%17 == 9) {
        child.chart.data.datasets[0].data.push(data[this.hosts[Math.floor(i/17)] + "dirty"] ? data[this.hosts[Math.floor(i/17)] + "dirty"] : 0);
        child.chart.data.labels.push("");
        if (child.chart.data.datasets[0].data.length > 10) {
          child.chart.data.labels.shift();
          child.chart.data.datasets[0].data.shift();
        }
        child.chart.update();
      } else if (i%17 == 10) {
        let data_list = [
          data[this.hosts[Math.floor(i/17)] + "active"],
          data[this.hosts[Math.floor(i/17)] + "inactive"],
          data[this.hosts[Math.floor(i/17)] + "available"],
          data[this.hosts[Math.floor(i/17)] + "used"],
          data[this.hosts[Math.floor(i/17)] + "dirty"],
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
      if (i%17 == 11) {
        child.chart.data.datasets[0].data.push(data[this.hosts[Math.floor(i/17)] + "total"]);
        child.chart.data.labels.push("");
        if (child.chart.data.datasets[0].data.length > 10) {
          child.chart.data.labels.shift();
          child.chart.data.datasets[0].data.shift();
        }
        child.chart.update();
      } else if (i%17 == 12) {
        child.chart.data.datasets[0].data.push(data[this.hosts[Math.floor(i/17)] + "running"] ? data[this.hosts[Math.floor(i/17)] + "running"] : 0);
        child.chart.data.labels.push("");
        if (child.chart.data.datasets[0].data.length > 10) {
          child.chart.data.labels.shift();
          child.chart.data.datasets[0].data.shift();
        }
        child.chart.update();
      } else if (i%17 == 13) {
        child.chart.data.datasets[0].data.push(data[this.hosts[Math.floor(i/17)] + "sleeping"] ? data[this.hosts[Math.floor(i/17)] + "sleeping"] : 0);
        child.chart.data.labels.push("");
        if (child.chart.data.datasets[0].data.length > 10) {
          child.chart.data.labels.shift();
          child.chart.data.datasets[0].data.shift();
        }
        child.chart.update();
      } else if (i%17 == 14) {
        child.chart.data.datasets[0].data.push(data[this.hosts[Math.floor(i/17)] + "zombies"] ? data[this.hosts[Math.floor(i/17)] + "zombies"] : 0);
        child.chart.data.labels.push("");
        if (child.chart.data.datasets[0].data.length > 10) {
          child.chart.data.labels.shift();
          child.chart.data.datasets[0].data.shift();
        }
        child.chart.update();
      } else if (i%17 == 15) {
        child.chart.data.datasets[0].data.push(data[this.hosts[Math.floor(i/17)] + "idle"] ? data[this.hosts[Math.floor(i/17)] + "idle"] : 0);
        child.chart.data.labels.push("");
        if (child.chart.data.datasets[0].data.length > 10) {
          child.chart.data.labels.shift();
          child.chart.data.datasets[0].data.shift();
        }
        child.chart.update();
      } else if (i%17 == 16) {
        let data_list = [
          data[this.hosts[Math.floor(i/17)] + "running"],
          data[this.hosts[Math.floor(i/17)] + "sleeping"],
          data[this.hosts[Math.floor(i/17)] + "zombies"],
          data[this.hosts[Math.floor(i/17)] + "idle"],
        ];
        child.chart.data.datasets[dataSetIndex].data = data_list;
        child.chart.update();
      }
      i++;
    });
  }
}
