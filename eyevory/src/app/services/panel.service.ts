import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

const baseURL = "http://localhost:8000";

@Injectable({
  providedIn: "root",
})
export class PanelService {
  constructor(private http: HttpClient) {}

  getQueryData(query: string): Observable<any> {
    return this.http.post(baseURL + "/api/influx_data/get_query_output/", {
      query: query,
    });
  }
}
