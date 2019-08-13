import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoginModel } from "../model/login/login.model";
import { TokenModel } from "../model/login/token.model";
import { UsuarioService } from "../services/usuario/usuario.service";
import { AuthService } from "../services/auth/auth-service";
import { MyMaskUtil } from "../shared/directives/my-mask.util";



@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginModel = new LoginModel();
  token = new TokenModel();
  _token: any;
  erro: any;
  showSpinner: boolean = false;
  mostrarMensagem = false;
  mensagem: string = "";
  cpf = MyMaskUtil.CPF_MASK_GENERATOR;


  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private router: Router
  ) {
    
  }

  ngOnInit() {}

  entrar() {
    this.showSpinner = true;
    this.mostrarMensagem = false;
    this.mensagem = "";

    this.usuarioService.logar(this.loginModel).subscribe(
      u => {

             this._token = u;
             this.token = u;

        if (this.token.authenticated) {
          localStorage.setItem("token", this.token.accessToken);
          localStorage.setItem("usuario", JSON.stringify(this.token.usuario));
          //location.reload();
          var user = this.authService.getUsuario();

          if(user.tipoUsuario == "Administrador"){

            this.router.navigate(["/admin"]);

          }else{
            this.router.navigate(["/professor"]);
          }


          this.showSpinner = false;
        } else {
          this._token.data.forEach(element => {
            console.log(element.message);

            this.mensagem += " - " + element.message;
          });

          //this.mensagem = this.token.message;
          this.router.navigate(["/login"]);
          this.showSpinner = false;
          this.mostrarMensagem = true;
        }
      },
      erro => {
        this.erro = erro;
        this.showSpinner = false;
      }
    );
  }
}
