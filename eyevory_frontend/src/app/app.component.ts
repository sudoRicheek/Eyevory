import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Eyevory (Application Monitor)';
  constructor(public auth: AuthService) { }

  onLogout() {
    this.auth.logout();
  }
}
