import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api_Url } from 'src/app/shared/util/URLAPI';
import { ConselhoModel } from 'src/app/model/Conselho/Conselho.model';
import { FiltroConselhoModel } from '../../model/conselho/filtro-conselho.model';




@Injectable({
  providedIn: 'root'
})
export class ConselhoService {

  constructor(private http:HttpClient) { }

  listarTodos(skip,take){

    return this.http.get<ConselhoModel[]>(Api_Url+`api/Conselho/v1/listar-todos/${skip}/${take}`);
  }

  salvar(ConselhoModel:ConselhoModel){
        console.log('service',ConselhoModel);

    return this.http.post(Api_Url+'api/Conselho/v1/salvar',ConselhoModel);
  }

  alterar(ConselhoModel:ConselhoModel){

    return this.http.post(Api_Url+'api/Conselho/v1/alterar',ConselhoModel);
  }

  detalhe(id:string){

    return this.http.get<ConselhoModel>(Api_Url+'api/Conselho/v1/detalhe/'+id);
  }

  filtrar(filtro){

    return this.http.post<any>(Api_Url+'api/Conselho/v1/filtrar/',filtro);
  }

  /* impressão */

  imprimir(Conselho:FiltroConselhoModel){
    const options = {responseType: 'blob' as 'json'};
    return this.http.post(Api_Url+'api/RelatorioConselho/v1/imprimir',Conselho,options);
  }


}
