import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api_Url } from 'src/app/shared/util/URLAPI';
import { AlunoConselhoModel } from '../../model/conselho/aluno-conselho.model';




@Injectable({
  providedIn: 'root'
})
export class AlunoConselhoService {

  constructor(public http : HttpClient) { }

  listarTodos(conselhoId){

    return this.http.get<AlunoConselhoModel[]>(Api_Url+`api/AlunoConselho/v1/listar-todos/${conselhoId}`);
  }

  salvar(alunoConselhoModel:AlunoConselhoModel){
        console.log('service',alunoConselhoModel);

    return this.http.post(Api_Url+'api/AlunoConselho/v1/salvar',alunoConselhoModel);
  }

  alterar(alunoConselhoModel:AlunoConselhoModel){

    return this.http.post(Api_Url+'api/AlunoConselho/v1/alterar',alunoConselhoModel);
  }

  detalhe(id:string){

    return this.http.get<AlunoConselhoModel>(Api_Url+'api/AlunoConselho/v1/detalhe/'+id);
  }



}
