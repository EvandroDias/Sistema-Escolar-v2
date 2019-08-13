import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth-service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {

  msgs = [];
  user:any;

  constructor(
    private authService:AuthService,
  ) {
    this.user = this.authService.getUsuario();
   }

  ngOnInit() {
    this.msgs.push({severity:'info', summary:'Ola!!', detail:'Seja bem vinda(o) '+this.user.nome+" "+this.user.sobreNome});
  }

}
