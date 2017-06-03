import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { OpenShiftProject } from '../_models/openshiftProject';

@Injectable()
export class OpenShiftService {

  constructor(private http: Http) { }

  getOpenShiftData(): Observable<any> {
    return this.http.get('assets/sampleData/sample-openShift-data.json').
      map(res => res.json());
  }
}
