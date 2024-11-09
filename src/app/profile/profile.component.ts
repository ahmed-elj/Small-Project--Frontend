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
  role = 'user';

  constructor(private credentialsService: CredentialsService) {
    user = this.credentialsService.getUser();
  }

  ngOnInit(): void {
    user = this.credentialsService.getUser();
    if (user) {
      this.name = user.name;
      this.email = user.email;
      this.password = user.password;
      this.role = user.role;
      console.log('connected profile! ' + user.name);
      // localStorage.removeItem('user');
    } else {
      console.log('not connected profile!');
      this.name = '';
      this.email = '';
      this.password = '';
    }
  }
}
