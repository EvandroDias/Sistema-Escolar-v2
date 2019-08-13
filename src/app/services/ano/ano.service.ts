import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Api_Url } from "src/app/shared/util/URLAPI";
import { AnoModel } from "src/app/model/ano/ano.model";
import { AtivarDesativarModel } from "src/app/Model/ativar-desativar.model";

@Injectable({
  providedIn: "root"
})
export class AnoService {
  constructor(private http: HttpClient) {}

  listar(status) {
    return this.http.get<AnoModel[]>(`${Api_Url}api/Ano/v1/listar/${status}`);
  }

  listarTodos(status,skip,take) {
    return this.http.get<AnoModel[]>(`${Api_Url}api/Ano/v1/listar-todos/${status}/${skip}/${take}`);
  }

  ativarDesativar(id:AtivarDesativarModel){

    return this.http.post(`${Api_Url}api/ano/v1/ativar-desativar`, id);
  }


  salvar(anoModel: any) {
    return this.http.post(Api_Url + "api/Ano/v1/salvar", anoModel);
  }

  alterar(anoModel: AnoModel) {
    return this.http.post(Api_Url + "api/Ano/v1/alterar", anoModel);
  }

  detalhe(id: string) {
    return this.http.get<AnoModel>(Api_Url + "api/Ano/v1/detalhe/" + id);
  }
}
