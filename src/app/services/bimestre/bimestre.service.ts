import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Api_Url } from "src/app/shared/util/URLAPI";
import { BimestreModel } from "src/app/model/bimestre/bimestre.model";
import { AtivarDesativarModel } from "src/app/Model/ativar-desativar.model";

@Injectable({
  providedIn: "root"
})
export class BimestreService {
  constructor(private http: HttpClient) {}

  listar(status) {
    return this.http.get<BimestreModel[]>(`${Api_Url}api/Bimestre/v1/listar/${status}`);
  }

  listarTodos(status,skip,take) {
    return this.http.get<BimestreModel[]>(`${Api_Url}api/Bimestre/v1/listar-todos/${status}/${skip}/${take}`);
  }

  ativarDesativar(id:AtivarDesativarModel){

    return this.http.post(`${Api_Url}api/bimestre/v1/ativar-desativar`, id);
  }


  salvar(bimestreModel: any) {
    return this.http.post(Api_Url + "api/Bimestre/v1/salvar", bimestreModel);
  }

  alterar(bimestreModel: BimestreModel) {
    return this.http.post(Api_Url + "api/Bimestre/v1/alterar", bimestreModel);
  }

  detalhe(id: string) {
    return this.http.get<BimestreModel>(Api_Url + "api/Bimestre/v1/detalhe/" + id);
  }
}
