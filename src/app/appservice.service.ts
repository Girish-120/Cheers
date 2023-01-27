import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AppserviceService {

  waitLoader: boolean = false;
  loaderStatus:boolean = true

  constructor(private http: HttpClient) { }
  
  httpOptions = {headers: new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem("token"))};


  getApi(url: any) {
    return this.http.get(environment.siteUrl + url, this.httpOptions);
  }

  post(url: any, data: any) {
    return this.http.post(environment.siteUrl + url, data, this.httpOptions);
  }

  put(url: any, data: any) {
    return this.http.put(environment.siteUrl + url, data, this.httpOptions);
  }

  delete(url: any, data: any) {
  const httpOptions1 = {headers: new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem("token")),
  body:{ address_id: data }};
  
    return this.http.delete(environment.siteUrl + url, httpOptions1);
  }


}
