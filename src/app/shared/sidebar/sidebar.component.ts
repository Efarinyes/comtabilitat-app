import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  constructor( private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

  }
  logout() {

    this.authService.logout().then( () => {
      this.router.navigate(['/login']);
    });
  }

}
