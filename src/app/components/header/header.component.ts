import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: firebase.User;

  constructor(
    private authService: AuthService,
    private afAuth: AngularFireAuth
  ) {
    this.afAuth.authState.subscribe(user => this.user = user);
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }


}
