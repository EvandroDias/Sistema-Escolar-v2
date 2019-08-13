import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DepartamentoModel } from "src/app/model/departamento/departamento.model";
import { Api_Url } from "src/app/shared/util/URLAPI";
import { AtivarDesativarModel } from "src/app/Model/ativar-desativar.model";



@Injectable({
    providedIn: 'root'
  })
  export class DepartamentoService {

    constructor(private http:HttpClient) { }

    listarTodos(status,skip,take){

      return this.http.get<DepartamentoModel[]>(Api_Url+'api/Departamento/v1/listar-todos/'+status+"/"+skip+"/"+take);
    }

    listar(){

      return this.http.get<DepartamentoModel[]>(Api_Url+'api/Departamento/v1/listar-todos/');
    }

    salvar(departamentoModel:any){

      return this.http.post(Api_Url+'api/Departamento/v1/salvar',departamentoModel);
    }

    alterar(departamentoModel:DepartamentoModel){

      return this.http.post(Api_Url+'api/Departamento/v1/alterar',departamentoModel);
    }

    detalhe(id:string){

      return this.http.get<DepartamentoModel>(Api_Url+'api/Departamento/v1/detalhe/'+id);
    }

    ativarDesativar(id:AtivarDesativarModel){

      return this.http.post(Api_Url+'api/Departamento/v1/ativar-desativar/',id);
    }
  }
