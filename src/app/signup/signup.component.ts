import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  api: ApiService;
  constructor(api: ApiService) {
    this.api = api;
  }
  message: string = '';
  Error: string = '';

  _user = {
    name: '',
    email: '',
    password: '',
  };

  signup() {
    // Get the form data

    const formData = {
      name: this._user.name,
      email: this._user.email,
      password: this._user.password,
    };

    // Call the API to create a new user
    this.api
      .post<string>('http://localhost:3000/api/signup', formData)
      .subscribe({
        next: (response) => {
          this.Error = '';
          this.message = 'User created successfully:' + response;
          console.log('successfully created user: ' + this.message);
        },
        error: (error) => {
          this.message = '';
          console.log(error);
          return error;
        },
      });
  }
}
