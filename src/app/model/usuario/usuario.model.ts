export class UsuarioModel{
  constructor(
      public id?:string,
      public nome?:string,
      public sobreNome?:string,
      public status?:boolean,
      public tipoUsuario?:string,
      public foto?:string,
      public configDadoPessoal?:boolean
  ){}
}
