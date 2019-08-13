import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-esquerdo-professor',
  templateUrl: './menu-esquerdo-professor.component.html',
  styleUrls: ['./menu-esquerdo-professor.component.css']
})
export class MenuEsquerdoProfessorComponent implements OnInit {

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
