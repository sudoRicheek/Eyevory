import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseURL = "http://localhost:8000";

@Injectable({
  providedIn: 'root'
})
export class ServersService {

  constructor(private http: HttpClient) { }

  getAvailableServers(): Observable<any> {
    return this.http.get(baseURL + "/api/influx_data/get_available_servers/");  
  }
}
