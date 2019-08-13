import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DiaSemanaModel } from './../../model/dia-da-semana/diaSemana.model';
import { Api_Url } from 'src/app/shared/util/URLAPI';




@Injectable({
  providedIn: 'root'
})
export class DiaSemanaService {

  constructor(private http: HttpClient) { }

  listarTodos() {
     return this.http.get<DiaSemanaModel[]>(Api_Url + `api/diasemana/v1/listar`);
  }

}
