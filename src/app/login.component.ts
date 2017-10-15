import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService, AppGlobals } from 'angular2-google-login';
import {Http} from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  providers: [AuthService]
})

export class LoginComponent implements OnInit {
  imageURL: string;
  email: string;
  name: string;
  token: string;

  private url='https://www.googleapis.com/tasks/v1/users/@me/lists';
  private API_KEY='AIzaSyBetFMBl9z1jjLTWKHBA7A9d7lI6_yt7-4';

  constructor(private auth: AuthService, private zone: NgZone,private http:Http) {}

  ngOnInit() {
    AppGlobals.GOOGLE_CLIENT_ID = '643098673382-714osua50a37sg3unhp6ojm41lshnn7f.apps.googleusercontent.com';
    this.getData();
    setTimeout(() => { this.googleAuthenticate() }, 50);
  }

  googleAuthenticate() {
    this.auth.authenticateUser((result) => {
      this.zone.run(() => {
        this.getData();
      });
    });
  }


  getData() {
    this.token = localStorage.getItem('token');
    this.imageURL = localStorage.getItem('image');
    this.name = localStorage.getItem('name');
    this.email = localStorage.getItem('email');
  }


  logout() {
    let scopeReference = this;
    this.auth.userLogout(function () {
      scopeReference.clearLocalStorage();
    });
  }


  clearLocalStorage() {
    localStorage.removeItem('token');
    localStorage.removeItem('image');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
  }

  getTasks(){
    this.http.get(this.url+'?access_token='+this.token).subscribe(response=>{
        console.log(response.json());
      });
  }
}
