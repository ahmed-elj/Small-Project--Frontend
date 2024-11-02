import { Component } from '@angular/core';
import { ApiService } from './../services/api.service';
import { CommonModule } from '@angular/common';

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
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  api: ApiService;
  userName: string = '';
  userEmail: string = '';
  error: string = '';

  constructor(api: ApiService) {
    this.api = api;
  }

  login() {
    const credentials = {
      email: 'kij@efe',
      password: '123456',
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
