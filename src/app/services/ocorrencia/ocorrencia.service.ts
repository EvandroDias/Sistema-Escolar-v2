import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api_Url } from 'src/app/shared/util/URLAPI';
import { OcorrenciaModel } from 'src/app/model/ocorrencia/ocorrencia.model';
import { take } from 'rxjs/operators';
import { AtivarDesativarModel } from '../../model/ativar-desativar.model';




@Injectable({
  providedIn: 'root'
})
export class OcorrenciaService {

  constructor(private http:HttpClient) { }

  listarTodos(skip,take){

    return this.http.get<OcorrenciaModel[]>(Api_Url+`api/ocorrencia/v1/listar-todos/${skip}/${take}`);
  }

  salvar(ocorrenciaModel:OcorrenciaModel){
        console.log('service',ocorrenciaModel);

    return this.http.post(Api_Url+'api/ocorrencia/v1/salvar',ocorrenciaModel);
  }

  alterar(ocorrenciaModel:OcorrenciaModel){

    return this.http.post(Api_Url+'api/ocorrencia/v1/alterar',ocorrenciaModel);
  }

  ativarDesativar(id:AtivarDesativarModel){

    return this.http.post(Api_Url+'api/ocorrencia/v1/ativar-desativar/',id);
  }

  detalhe(id:string){

    return this.http.get<OcorrenciaModel>(Api_Url+'api/ocorrencia/v1/detalhe/'+id);
  }

  filtrar(filtro){

    return this.http.post<any>(Api_Url+'api/ocorrencia/v1/filtrar/',filtro);
  }

  /* impressão */

  imprimir(f:any) {
    const options = { responseType: "blob" as "json" };
    return this.http.post(
      Api_Url + "api/RelatorioOcorrencia/v1/imprimir",
      f,
      options
    ).pipe(take(1));
  }
  imprimirTotal(f:any) {
    const options = { responseType: "blob" as "json" };
    return this.http.post(
      Api_Url + "api/RelatorioOcorrencia/v1/imprimir/total",
      f,
      options
    ).pipe(take(1));
  }

  /*imprimir(filtro:any){
    const options = {responseType: 'blob' as 'json'};
    return this.http.post(Api_Url+'api/RelatorioOcorrencia/v1/imprimir',filtro,options);
  }*/

  /*graficos */
  grafico(filtro:any){
    return this.http.post<any>(Api_Url+'api/ocorrencia/v1/grafico/',filtro);
  }

  graficoPorSerie(filtro:any){
    return this.http.post<any>(Api_Url+'api/ocorrencia/v1/grafico-por-serie/',filtro);
  }

  PainelGrafico(filtro:any){
    return this.http.post<any>(Api_Url+'api/ocorrencia/v1/painel-grafico/',filtro);
  }
}
