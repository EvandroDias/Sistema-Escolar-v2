export class ListarRotinaModel{
  constructor(
    public rotinaId?:string,
    public status?:boolean,
    public  de?: Date,
    public  ate?: Date,
    public  nomeSerie?: string,
    public  nomeFuncionario?: string,
    public dataCadastro?:Date
  ){

  }
}
