import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { GithubUser } from '../_models/githubUser';

@Injectable()
export class GithubUserService {

  constructor(private http: Http) { }

  getUser(userHandle: string): Observable<GithubUser> {
    console.log('get user');
    return this.http.get('https://api.github.com/users/' + userHandle + '')
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
  }
}
