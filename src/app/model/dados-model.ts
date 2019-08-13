export class DadosModel{
  constructor(

 public filtro?: string,
 public skip: number = 0,
 public take: number = 50,
 public showSpinner: boolean = false,
 public pagina: number = 0,
 public qtdPagina: number = 5,
 public status:any = "true"
  ){}
}
