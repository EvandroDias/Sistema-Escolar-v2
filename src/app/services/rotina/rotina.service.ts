import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AtivarDesativarModel } from "src/app/Model/ativar-desativar.model";
import { ListarRotinaModel } from "src/app/model/rotina/listar-rotina.model";
import { Api_Url } from "src/app/shared/util/URLAPI";
import { CadastrarRotinaModel } from "src/app/model/rotina/cadastrar-rotina.model";

@Injectable({
  providedIn: "root"
})
export class RotinaService {
  constructor(private http: HttpClient) {}

  listarTodos(skip, take) {
    return this.http.get<ListarRotinaModel[]>(
      Api_Url + `api/rotina/v1/listar-todos/${skip}/${take}`
    );
  }

  listarMinhasRotinas(skip, take) {
    return this.http.get<ListarRotinaModel[]>(
      Api_Url + `api/rotina/v1/listar-minhas-rotinas/${skip}/${take}`
    );
  }

  salvar(cadastrarRotinaModel: CadastrarRotinaModel) {
    return this.http.post(
      Api_Url + "api/rotina/v1/salvar",
      cadastrarRotinaModel
    );
  }

  alterar(cadastrarRotinaModel: CadastrarRotinaModel) {
    return this.http.post(
      Api_Url + "api/rotina/v1/alterar",
      cadastrarRotinaModel
    );
  }

  excluir(ativarDesativarModel: AtivarDesativarModel) {
    return this.http.post(
      Api_Url + "api/rotina/v1/ativar-desativar",
      ativarDesativarModel
    );
  }

  imprimir(imprimirRotinaModel) {
    const options = { responseType: "blob" as "json" };
    return this.http.post(
      Api_Url + "api/RelatorioRotina/v1/imprimir",
      imprimirRotinaModel,
      options
    );
  }

  detalhe(id) {
    return this.http.get<any>(Api_Url + `api/rotina/v1/detalhe/${id}`);
  }
}
