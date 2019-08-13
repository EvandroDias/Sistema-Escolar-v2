import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth-service';

@Component({
  selector: 'app-home-professor',
  templateUrl: './home-professor.component.html',
  styleUrls: ['./home-professor.component.css']
})
export class HomeProfessorComponent implements OnInit {

  msgs = [];
  user:any;

  constructor( private authService:AuthService,) {
    this.user = this.authService.getUsuario();
  }

  ngOnInit() {
    this.msgs.push({severity:'info', summary:'Ola!!', detail:'Seja bem vinda(o) '+this.user.nome+" "+this.user.sobreNome});
  }

}
