

export class FuncionarioModel{

    constructor(
        public id?:string,
        public nome?:string,
        public sobreNome?:string,
        public status:boolean = true,

        public  rg?:string,
        public  cpf?:string,
        public  dataNascimento?:Date,
        public  sexo?:string,
        public  telefoneFixo?:string,
        public  celular?:string,
        public  nacionalidade?:string,
        public  natural?:string,
        public  email?:string,
        public  foto?:string,
        public  senha?:string,


        public  rua?:string,
        public  numero?:string,
        public  bairro?:string,
        public  complemento?:string,
        public  uf?:string,
        public  cidade?:string,
        public  cep?:string,
        public funcaoId?:any,
        public tipoUsuario?:string

    ){}
}
