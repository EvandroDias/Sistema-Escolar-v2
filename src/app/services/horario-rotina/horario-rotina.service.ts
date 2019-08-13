import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ListarRotinaModel } from "src/app/model/rotina/listar-rotina.model";
import { Api_Url } from "src/app/shared/util/URLAPI";
import { CadastrarHorarioRotinaModel } from "src/app/model/horario-rotina/cadastrar-horario-rotina.model";
import { AlterarHorarioRotinaModel } from "src/app/model/horario-rotina/alterar-horario-rotina.model";


@Injectable({
  providedIn: "root"
})
export class HorarioRotinaService {
  constructor(private http: HttpClient) {}

  listar(rotinaId, diaSemanaId) {
    return this.http.get<ListarRotinaModel[]>(
      Api_Url + `api/HorarioRotina/v1/listar/${rotinaId}/${diaSemanaId}`
    );
  }

  listarTodos(rotinaId) {
    return this.http.get(
      Api_Url + `api/HorarioRotina/v1/listar-todos/${rotinaId}`
    );
  }

  detalhe(id) {
    return this.http.get(`${Api_Url}api/HorarioRotina/v1/detalhe/${id}`);
  }

  detalheAdmin(id) {
    return this.http.get(`${Api_Url}api/HorarioRotina/v1/detalhe-admin/${id}`);
  }

  salvar(cadastrarHorarioRotinaModel: CadastrarHorarioRotinaModel) {
    return this.http.post(
      Api_Url + "api/HorarioRotina/v1/salvar",
      cadastrarHorarioRotinaModel
    );
  }

  alterar(alterarHorarioRotinaModel: AlterarHorarioRotinaModel) {
    return this.http.post(
      Api_Url + "api/HorarioRotina/v1/alterar",
      alterarHorarioRotinaModel
    );
  }
}
