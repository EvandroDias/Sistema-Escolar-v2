import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TipoOcorrenciaCmbModel } from 'src/app/model/tipo-ocorrencia/tipo-ocorrencia.model';
import { Api_Url } from 'src/app/shared/util/URLAPI';
import { OcorrenciaModel } from 'src/app/model/ocorrencia/ocorrencia.model';
import { AtivarDesativarModel } from 'src/app/Model/ativar-desativar.model';


@Injectable({
  providedIn: 'root'
})
export class TipoOcorrenciaService {

  constructor(private http:HttpClient) { }



  listarTodos(status,skip,take){

    return this.http.get<TipoOcorrenciaCmbModel[]>(Api_Url+`api/tipoOcorrencia/v1/listar-todos/${status}/${skip}/${take}`);
  }

  ativarDesativar(id:AtivarDesativarModel){

    return this.http.post(Api_Url+'api/tipoOcorrencia/v1/ativar-desativar/',id);
  }
  listarCmb(){

    return this.http.get<TipoOcorrenciaCmbModel[]>(Api_Url+`api/tipoOcorrencia/v1/listar-cmb`);
  }

  salvar(tipoOcorrenciaModel:any){

    return this.http.post(Api_Url+'api/tipoOcorrencia/v1/salvar',tipoOcorrenciaModel);
  }

  alterar(ocorrenciaModel:OcorrenciaModel){

    return this.http.post(Api_Url+'api/tipoOcorrencia/v1/alterar',ocorrenciaModel);
  }

  detalhe(id:string){

    return this.http.get<OcorrenciaModel>(Api_Url+'api/tipoOcorrencia/v1/detalhe/'+id);
  }
}
