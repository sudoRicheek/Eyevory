import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  username !: string;
  name !: string;
  IsAdmin !: boolean;

  constructor(private sService : ServerService) { }

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile() {
    this.sService.get("/api/user/profile").subscribe( data => {
      this.username = data['username'],
      this.name = data['name'],
      this.IsAdmin = data['isadmin'],
      console.log(this.username, this.name, this.IsAdmin);
    })
  }

}
