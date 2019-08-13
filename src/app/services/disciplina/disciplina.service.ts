import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DisciplinaModel } from "src/app/model/disciplina/disciplina.model";
import { Api_Url } from "src/app/shared/util/URLAPI";
import { AtivarDesativarModel } from './../../model/ativar-desativar.model';


@Injectable({
  providedIn: "root"
})
export class DisciplinaService {
  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<DisciplinaModel[]>(
      Api_Url + "api/Disciplina/v1/listar"
    );
  }

  listarTodos(status,skip,take) {
    return this.http.get<DisciplinaModel[]>(`${Api_Url}api/Disciplina/v1/listar-todos/${status}/${skip}/${take}`);
  }

  ativarDesativar(id:AtivarDesativarModel){

    return this.http.post(`${Api_Url}api/Disciplina/v1/ativar-desativar`, id);
  }

  salvar(disciplinaModel: any) {
    return this.http.post(
      Api_Url + "api/Disciplina/v1/salvar",
      disciplinaModel
    );
  }

  alterar(disciplinaModel: DisciplinaModel) {
    return this.http.post(
      Api_Url + "api/Disciplina/v1/alterar",
      disciplinaModel
    );
  }

  detalhe(id: string) {
    return this.http.get<DisciplinaModel>(
      Api_Url + "api/Disciplina/v1/detalhe/" + id
    );
  }
}
