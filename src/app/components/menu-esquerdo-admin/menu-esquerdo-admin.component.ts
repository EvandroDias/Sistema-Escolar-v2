import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-esquerdo-admin',
  templateUrl: './menu-esquerdo-admin.component.html',
  styleUrls: ['./menu-esquerdo-admin.component.css']
})
export class MenuEsquerdoAdminComponent implements OnInit {

  showSpinner: boolean = false;

  constructor(
    private authService:AuthService,
    private router:Router
  ) { }

  ngOnInit() {
  }

  sair(){
    this.showSpinner = true;
    setTimeout(() => {
      this.showSpinner = false;
    }, 3000);
    this.authService.logout();
    this.router.navigate(['/login']);

  }

}
