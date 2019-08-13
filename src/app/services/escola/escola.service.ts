import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Api_Url } from "src/app/shared/util/URLAPI";
import { EscolaModel } from "src/app/model/escola/escola.model";


@Injectable({
  providedIn: "root"
})
export class EscolaService {
  constructor(private http: HttpClient) {}



  listarTodos() {
    return this.http.get<EscolaModel[]>(`${Api_Url}api/Escola/v1/listar-todos`);
  }


}
