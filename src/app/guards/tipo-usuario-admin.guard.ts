import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth-service';


@Injectable({
  providedIn: 'root'
})
export class TipoUsuarioAdminGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.verificarAcesso();
  }

  private verificarAcesso(){

    let tipo = this.authService.getUsuario();

     if(tipo != null){

      if (tipo.tipoUsuario == "Administrador" && this.authService.autenticado()){


        return true;

      }


      else{

        this.router.navigate(['/login']);

        return false;
      }

     }
    else{
      this.router.navigate(['/login']);

      return false;
    }


  }

  	canLoad(route: Route): Observable<boolean>|Promise<boolean>|boolean {
      console.log('canLoad: verificando se usuário pode carregar o cod módulo');

      return this.verificarAcesso();
    }
}
