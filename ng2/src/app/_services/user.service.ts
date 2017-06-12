/**
 * Created by Garmonz on 2017-04-26.
 */
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { UserModel } from '../_models/userModel';

@Injectable()
export class UserService {
  constructor(private http: Http) { }

  getAll() {
    return this.http.get('/api/users', this.jwt())
      .map((response: Response) => response.json());
  }

  getById(id: number) {
    return this.http.get('/api/users/' + id, this.jwt())
      .map((response: Response) => response.json());
  }

  create(user: UserModel) {
    return this.http.post('/api/users', user, this.jwt())
      .map((response: Response) => response.json());
  }

  update(user: UserModel) {
    return this.http.put('/api/users/' + user.id, user, this.jwt())
      .map((response: Response) => response.json());
  }

  delete(id: number) {
    return this.http.delete('/api/users/' + id, this.jwt())
      .map((response: Response) => response.json());
  }

  // private helper methods

  private jwt() {
    // create authorization header with jwt token
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
      return new RequestOptions({ headers: headers });
    }
  }
}
