export class CadastrarRotinaModel{
  constructor(
    public  de?: Date,
    public  ate?: Date,
    public  serieId?: string,
    public rotinaId?:string,
    public imgCabecalho:string = "cabeçalho.png"
  ){}
}
