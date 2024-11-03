import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class CredentialsService {
  private user:any= null;
  constructor() { }


  setUser(_name: string, _email: string, _password: string) {
    this.user = {
      name: _name,
      email: _email,
      password: _password
    }
  }

  getUser() {
    return this.user;
  }

}
