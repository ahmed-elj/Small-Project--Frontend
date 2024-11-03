import { CredentialsService } from './../services/credentials.service';
import { Component } from '@angular/core';
import { ApiService } from './../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface UserResponse {
  message: string;
  token: string;
  user: {
    name: string;
    email: string;
  };
}

interface User {
  name: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  user: User = { name: '', email: '', password: '' };
  _user: User = { name: '', email: '', password: '' };
  api: ApiService;
  error: string = '';
  cred: CredentialsService;

  constructor(api: ApiService, private CredentialsService: CredentialsService) {
    this.api = api;
    this.cred = CredentialsService;
  }
  login(): any {
    const credentials = {
      email: this._user.email,
      password: this._user.password,
    };

    if (
      this._user.email.length < 4 ||
      this._user.email.search('@') < 0 ||
      this._user.password.length < 6
    ) {
      return (this.error = 'Please check in all fields');
    }
    try {
      console.log('Login attempt:', credentials);
      this.api
        .post<UserResponse>('http://localhost:3000/api/login', credentials)
        .subscribe({
          next: (response) => {
            console.log('Login successful:', response);
            this.user.name = response.user.name;
            this.user.email = response.user.email;
            this.error = ''; // to clear the error message
            this.cred.setUser(
              response.user.name,
              response.user.email,
              this._user.password
            );
            console.log(this.cred.getUser().name);
          },
          error: (error) => {
            console.error('Error during login:', error);
            this.error = error.message;
            this.user.name = ''; // to clear the info
          },
        });
    } catch (error) {
      console.log(error);
      return (error = 'an error occured!');
    }
  }
}
