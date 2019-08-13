import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AtivarDesativarModel } from 'src/app/Model/ativar-desativar.model';
import { LoginModel } from 'src/app/model/login/login.model';
import { Api_Url } from 'src/app/shared/util/URLAPI';
import { UsuarioModel } from 'src/app/model/usuario/usuario.model';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient) { }

  logar(loginModel:LoginModel){

    return this.http.post(Api_Url+'api/Login',loginModel);
  }

  ativarDesativa(ativar:AtivarDesativarModel){

    return this.http.post(Api_Url+'api/usuario/v1/ativar-desativar',ativar);
  }

  listarTodos(){

    return this.http.get<UsuarioModel[]>(Api_Url+'api/usuario/v1/listar-todos-usuario');
  }

  detalhe(id:string){

    return this.http.get<UsuarioModel>(Api_Url+'api/usuario/v1/detalhe/'+id);
  }
}
