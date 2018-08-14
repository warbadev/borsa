import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable"
import 'rxjs/add/operator/map';
@Injectable()
export class SmartTableService {
  uri = 'http://localhost:4000/areas';

  constructor(private http: HttpClient) {
  }
  getData() {

    return this
           .http
           .get(`${this.uri}/`).map(res => {
            return res;  })}
}
