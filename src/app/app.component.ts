import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/core/services/auth.service';
import firebase from 'firebase/compat/app';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Trello-clone';

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.addAuthUser();
  }
}
