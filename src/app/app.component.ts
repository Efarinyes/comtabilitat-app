import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'contabilitatApp';

  constructor( private authService: AuthService ) {
      this.authService.initAuthListener();
  }
}
