import { UsuarioModel } from "../usuario/usuario.model";


export class TokenModel{

    constructor(
        public accessToken?: string,
        public authenticated?: boolean,
        public created?: Date,
        public expiration?:Date,
        public message?:string,
        public usuario?:UsuarioModel
    ){

    }
}
