import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth-service';
import { Router } from '@angular/router';
import { Api_Url } from '../../shared/util/URLAPI';

@Component({
  selector: 'app-menu-topo',
  templateUrl: './menu-topo.component.html',
  styleUrls: ['./menu-topo.component.css']
})
export class MenuTopoComponent implements OnInit {

  showSpinner: boolean = false;
  user:any;
  Api_Url;

  constructor(
    private authService:AuthService,
    private router:Router
  ) { }

  ngOnInit() {

    this.user = this.authService.getUsuario();
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
