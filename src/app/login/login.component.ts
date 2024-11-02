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
  }
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  api: ApiService;
  userName: string = '';
  userEmail: string = '';
  error: string = '';
  password: string = '';
  _userEmail: string = '';
  _password: string = '';

  constructor(api: ApiService) {
    this.api = api;
  }

  login() {
    const credentials = {
      email: this._userEmail,
      password: this._password,
    };

    this.api
      .post<UserResponse>(
        'http://localhost:3000/api/login',
        credentials
      )
      .subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          this.userName = response.user.name;
          this.userEmail = response.user.email;
        },
        error: (error) => {
          console.error('Error during login:', error);
        }
      });
  }
}
