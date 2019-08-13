import { Injectable } from '@angular/core';
import { map } from '../../../../node_modules/rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { FuncaoService } from 'src/app/services/funcao/funcao.service';
import { Uf } from 'src/app/model/uf/uf.model';
import { Cidade } from 'src/app/model/cidade/cidade.model';



@Injectable({
  providedIn: 'root'
})
export class ServicosUtilService {



  constructor(
    private http: HttpClient,
    private funcaoService:FuncaoService,

    ) { }


    getStatus() {
      return [
        { nome: 'Ativo' },
        { nome: 'Transferido de Sala'},
      ];
    }
  getSexo() {
    return [
      { nome: 'Masculino' },
      { nome: 'Feminino'},
    ];
  }
  getEnsino() {
    return [
      { nome: 'Ensino Fundamental I' },
      { nome: 'Ensino Fundamental II'},
    ];
  }
  getPeriodo(){
    return [
      {id:1,nome:'Manhã'},
      {id:2,nome:'Tarde'},
      {id:3,nome:'Noite'},

    ];
  }

  getTipoUsuario(){
    return [
      {id:1,nome:'Administrador'},
      {id:2,nome:'Professor'},
      {id:3,nome:'Coordenador'},
      {id:4,nome:'Aluno'}
    ];
  }

  getAula() {
    return this.http.get('assets/dados/aula.json');
  }

  getEstadosBr() {
    return this.http.get<Uf[]>('assets/dados/estadosbr.json');
  }

  getCidades(idEstado: number) {
    return this.http.get<Cidade[]>('assets/dados/cidades.json')
    .pipe(
      // tslint:disable-next-line:triple-equals
      map((cidades: Cidade[]) => cidades.filter(c => c.estado == idEstado))
    );
  }

  getNascionalidade() {
    return this.http.get<any>('assets/dados/nascionalidade-paises.json');

  }

  getFuncao(){
    return this.funcaoService.listar(true);
  }

}


