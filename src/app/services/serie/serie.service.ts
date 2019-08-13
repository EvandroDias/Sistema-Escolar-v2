import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { SerieModel } from "src/app/model/serie/serie.model";
import { Api_Url } from "src/app/shared/util/URLAPI";
import { SerieCmbModel } from "src/app/model/serie/serie-cmb.model";
import { AtivarDesativarModel } from "src/app/Model/ativar-desativar.model";


@Injectable({
    providedIn: 'root'
  })
  export class SerieService {

    constructor(private http:HttpClient) { }

    listar(status){

      return this.http.get<SerieModel[]>(`${Api_Url}api/Serie/v1/listar/${status}`);
    }

    listarTodos(status,skip,take){

      return this.http.get<SerieModel[]>(`${Api_Url}api/Serie/v1/listar-todos/${status}/${skip}/${take}`);
    }

    ativarDesativar(id:AtivarDesativarModel){

      return this.http.post(`${Api_Url}api/serie/v1/ativar-desativar`,id);
    }

    listarCmb(){

      return this.http.get<SerieCmbModel[]>(Api_Url+'api/Serie/v1/listar-cmb');
    }

    salvar(serieModel:any){

      return this.http.post(Api_Url+'api/serie/v1/salvar',serieModel);
    }

    alterar(serieModel:SerieModel){

      return this.http.post(Api_Url+'api/serie/v1/alterar',serieModel);
    }

    detalhe(id:string){

      return this.http.get<SerieModel>(Api_Url+'api/serie/v1/detalhe/'+id);
    }
  }

