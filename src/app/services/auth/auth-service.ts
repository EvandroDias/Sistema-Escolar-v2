import { Injectable } from '@angular/core';
import { HttpRequest } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { UsuarioModel } from 'src/app/model/usuario/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }


  public getUsuario(): UsuarioModel {
    return JSON.parse(localStorage.getItem('usuario'));
  }

  removeToken(){
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  }

  public autenticado(): boolean{
    if(this.isAuthenticated){
      this.loggedIn.next(true);
      return this.isAuthenticated();
    }else{
      this.isAuthenticated();
    }
  }

  public isAuthenticated(): boolean {
    // get the token
    const token = this.getToken();

    if(token == null){
      console.log('null');

      return false;
    }else{
      console.log('true');

      return true;
    }

  }

  cachedRequests: Array<HttpRequest<any>> = [];

  public collectFailedRequest(request): void {
      this.cachedRequests.push(request);
    }
  public retryFailedRequests(): void {
      // retry the requests. this method can
      // be called after the token is refreshed
    }

    logout() {                            // {4}
    this.loggedIn.next(false);
    this.removeToken();
  }
}
