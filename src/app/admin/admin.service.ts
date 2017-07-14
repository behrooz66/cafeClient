import { Injectable } from '@angular/core';
import { Settings } from '../settings';
import { HttpAuthService } from '../shared/http-auth.service';

@Injectable()
export class AdminService {

  apiBase: string = Settings.apiBase + "admin/";

  constructor(private _http: HttpAuthService) 
  { 
      
  }

  getUsersList()
  {
      return this._http.get(this.apiBase + 'getUsers')
          .map(res => res.json());
  }

  usernameTaken(username: string){
      return this._http.get(this.apiBase + 'userExists/' + username)
            .map(res => res.json());
  }

  getUser(id: string) 
  {
      return this._http.get(this.apiBase + 'getUser/' + id)
          .map(res => res.json());
  }

  addUser(name: string, username: string) 
  {
      return this._http.post(this.apiBase + 'addUser', {
          "name": name,
          "username": username
      })
      .map(res => res.json());
  }

  activateUser(id) 
  {
      return this._http.put(this.apiBase + 'activateUser/' + id, null)
          //.map(res => res.json());
  }

  deactivateUser(id: string) 
  {
      return this._http.put(this.apiBase + 'deactivateUser/' + id, null)
          //.map(res => res.json());
  }

  updatePassword(oldPassword: string, newPassword: string)
  {
      return this._http.put(this.apiBase + 'updatePassword', {
          oldPassword: oldPassword,
          newPassword: newPassword
      });
  }

  deleteUser(id: string) 
  {
      return this._http.delete(this.apiBase + 'deleteUser/' + id);
  }

  resetPassword(id: string)
  {
      return this._http.put(this.apiBase + 'resetPassword/' + id, {});
  }

}
