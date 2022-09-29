import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Trello-clone';

  constructor(private auth: AngularFireAuth) {}

  async console(): Promise<void> {
    console.log( await firstValueFrom(this.auth.user))
  };

  ngOnInit(): void {
    this.console()
  }
}


