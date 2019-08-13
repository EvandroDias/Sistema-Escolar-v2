import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Api_Url } from "src/app/shared/util/URLAPI";
import { FuncaoModel } from "src/app/model/funcao/funcao.model";
import { AtivarDesativarModel } from "src/app/Model/ativar-desativar.model";

@Injectable({
  providedIn: "root"
})
export class FuncaoService {
  constructor(private http: HttpClient) {}

  listar(status) {
    return this.http.get<FuncaoModel[]>(`${Api_Url}api/Funcao/v1/listar/${status}`);
  }

  listarTodos(status,skip,take) {
    return this.http.get<FuncaoModel[]>(`${Api_Url}api/Funcao/v1/listar-todos/${status}/${skip}/${take}`);
  }

  ativarDesativar(id:AtivarDesativarModel){

    return this.http.post(`${Api_Url}api/funcao/v1/ativar-desativar`, id);
  }


  salvar(funcaoModel: any) {
    return this.http.post(Api_Url + "api/Funcao/v1/salvar", funcaoModel);
  }

  alterar(funcaoModel: FuncaoModel) {
    return this.http.post(Api_Url + "api/Funcao/v1/alterar", funcaoModel);
  }

  detalhe(id: string) {
    return this.http.get<FuncaoModel>(Api_Url + "api/Funcao/v1/detalhe/" + id);
  }
}
