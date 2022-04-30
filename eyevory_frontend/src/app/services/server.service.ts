import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

const baseUrl = 'http://10.42.0.57:8000';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  private isAdmin = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient
  ) { }

  get isAnAdmin() {
    this.get("/api/user/profile").subscribe( data => {
      if(parseInt(data['isadmin'])==1) this.isAdmin.next(true);
    })
    return this.isAdmin.asObservable();
  }

  request(method: string, route: string, data?: any) {
    if (method === 'GET') {
      return this.get(route, data);
    }
    else if (method === 'POST') {
      return this.post(route, data);
    }
    else if (method === 'PUT') {
      return this.put(route, data);
    }

    return this.http.request(method, baseUrl + route, {
      body: data,
      responseType: 'json',
      observe: 'body',
    });
  }

  get(route: string, data?: any, blob: boolean = false): Observable<any> {
    let params = new HttpParams();
    if (data !== undefined) {
      Object.getOwnPropertyNames(data).forEach(key => {
        params = params.set(key, data[key]);
      });
    }
    if (blob) {
      return this.http.get(baseUrl + route, {
        observe: 'response',
        responseType: 'blob' as 'json'
      });
    }
    return this.http.get(baseUrl + route, {
      responseType: 'json',
      params
    });
  }

  post(route: string, data?: any, skip: boolean = false): Observable<any> {
    if (skip) {
      return this.http.post(baseUrl + route, data, { headers: { skip: "true" } });
    }
    return this.http.post(baseUrl + route, data);
  }

  put(route: string, data?: any): Observable<any> {
    return this.http.put(baseUrl + route, data);
  }
}