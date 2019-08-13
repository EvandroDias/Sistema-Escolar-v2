import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth/auth-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Sistema-Escolar-v2';

  constructor(
    private authService: AuthService,
    private router: Router
  ){
    /*var user = this.authService.getUsuario();

    console.log(user);

    if (user != null) {

      if (user.tipoUsuario == "Administrador") {
        this.router.navigate(["/admin"]);
      } else {
        this.router.navigate(["/professor"]);
      }
    }else{
      this.router.navigate(["/login"]);
    }*/
  }


}
