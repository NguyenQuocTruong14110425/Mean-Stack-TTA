import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class MemberService {

  domain = "http://localhost:8080";
  
    constructor(
      private http: Http
  
  
    ) { }
  getAllmember() {
    return this.http.get(this.domain + '/authentication/listmember').map(res => res.json());
  }

}
