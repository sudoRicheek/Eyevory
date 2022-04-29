import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

const baseURL = "http://localhost:8000";

@Injectable({
  providedIn: "root",
})
export class ThreshService {
  constructor(private http: HttpClient) {}

  updateThresholds(cpu_threshold, mem_avail_threshold): Observable<any> {
    return this.http.put(baseURL + "/api/influx_data/update_thresholds/", {
      "cpu_idle_threshold": cpu_threshold,
      "mem_available_threshold": mem_avail_threshold,
    });
  }

  getThresholds(): Observable<any> {
    return this.http.get(baseURL + "/api/influx_data/get_thresholds/");
  }
}
