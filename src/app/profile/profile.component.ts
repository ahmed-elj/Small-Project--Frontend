import { Component } from '@angular/core';
import { CredentialsService } from '../services/credentials.service';

let user: any;

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  name = '';
  email = '';
  password = '';

  constructor(private credentialsService: CredentialsService) {
    user = this.credentialsService.getUser();
  }

  ngOnInit(): void {
    user = this.credentialsService.getUser();
    if (user) {
      this.name = user.name;
      this.email = user.email;
      this.password = user.password;
      console.log('connected profile! ' + user.name);
      localStorage.removeItem('user');
    } else {
      console.log('not connected profile!');
      // Optionally, you might want to initialize with empty values
      this.name = '';
      this.email = '';
      this.password = '';
    }
  }
}
