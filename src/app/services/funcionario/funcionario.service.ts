import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { AtivarDesativarModel } from 'src/app/Model/ativar-desativar.model';
import { Api_Url } from 'src/app/shared/util/URLAPI';
import { FuncionarioModel } from 'src/app/model/funcionario/funcionario.model';
import { FuncionarioCmbModel } from 'src/app/model/funcionario/funcionario-cmb.model';



@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  constructor(private http:HttpClient) { }

  salvar(funcionarioModel:any){

    return this.http.post(Api_Url+'api/Funcionario/v1/salvar',funcionarioModel);
  }

  alterar(registrarModel:FuncionarioModel){

    return this.http.post(Api_Url+'api/funcionario/v1/alterar',registrarModel);
  }

  detalhe(id:string){

    return this.http.get<FuncionarioModel>(Api_Url+'api/funcionario/v1/detalhe/'+id);
  }

  ativarDesativar(id:AtivarDesativarModel){

    return this.http.post(Api_Url+'api/funcionario/v1/ativar-desativar/',id);
  }

  listarTodos(status,skip,take){
     console.log(`${Api_Url}api/funcionario/v1/listar-todos/${status}/${skip}/${take}`);

    return this.http.get<FuncionarioModel[]>(`${Api_Url}api/funcionario/v1/listar-todos/${status}/${skip}/${take}`);
  }
  pesquisar(nome){

    return this.http.get<FuncionarioModel[]>(Api_Url+'api/funcionario/v1/pesquisar/'+nome);
  }
  listarFuncao(nome:string){

    return this.http.get<FuncionarioCmbModel[]>(`${Api_Url}api/funcionario/v1/listar-funcao/${nome}`);
  }
  listarCmb(){

    return this.http.get<FuncionarioCmbModel[]>(Api_Url+'api/funcionario/v1/listar-cmb');
  }
}
