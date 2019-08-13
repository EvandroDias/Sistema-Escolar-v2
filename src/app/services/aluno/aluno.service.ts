import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api_Url } from 'src/app/shared/util/URLAPI';
import { AlunoModel } from 'src/app/model/aluno/aluno.model';
import { AtivarDesativarModel } from 'src/app/Model/ativar-desativar.model';
import { AlunoCmbModel } from 'src/app/model/aluno/aluno-cmb.model';




@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  constructor(private http:HttpClient) { }

  salvar(alunoModel:any){

    return this.http.post(Api_Url+'api/aluno/v1/salvar',alunoModel);
  }

  alterar(registrarModel:AlunoModel){

    return this.http.post(Api_Url+'api/aluno/v1/alterar',registrarModel);
  }
  ativarDesativar(id:AtivarDesativarModel){

    return this.http.post(Api_Url+'api/aluno/v1/ativar-desativar/',id);
  }

  detalhe(id:string){

    return this.http.get<AlunoModel>(Api_Url+'api/aluno/v1/detalhe/'+id);
  }

  listarTodos(status,skip,take){

    return this.http.get<AlunoModel[]>(Api_Url+'api/aluno/v1/listar-todos-alunos/'+status+"/"+skip+"/"+take);
  }
  pesquisar(nome){

    return this.http.get<AlunoModel[]>(Api_Url+'api/aluno/v1/pesquisar/'+nome);
  }
  listarCmb(){

    return this.http.get<AlunoCmbModel[]>(Api_Url+'api/aluno/v1/listar-cmb');
  }
  listarPorSerieId(id){

    return this.http.get<AlunoCmbModel[]>(Api_Url+'api/aluno/v1/listar-cmb/'+id);
  }
  listarPorTurmaId(turmaId){

    return this.http.get<AlunoCmbModel[]>(Api_Url+'api/aluno/v1/listar-por-turmaId/'+turmaId);
  }
}
