import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeLayoutComponent } from "./layouts/home-layout/home-layout.component";
import { LoginLayoutComponent } from "./layouts/login-layout/login-layout.component";
import { LoginComponent } from "./login/login.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { HomeAdminComponent } from "./components/home-admin/home-admin.component";
import { TipoUsuarioGuard } from "./guards/tipo-usuario.guard";
import { HomeProfessorLayoutComponent } from './layouts/home-layout-professor/home-professor-layout.component';
import { HomeProfessorComponent } from './components/home-professor/home-professor.component';

const appRouting: Routes = [
 /* {
    path: "",
    component: HomeLayoutComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    children: [
      {
        path: "",
        component: HomeProfessorComponent,
          canActivate: [AuthGuard],
          canLoad: [AuthGuard]
      }
    ]
  },*/

 
  {
    path: "admin",
    component: AdminLayoutComponent,
     canActivate: [TipoUsuarioGuard],
     canLoad: [TipoUsuarioGuard],
    children: [
      {
        path: "",
        component: HomeAdminComponent,
         canActivate: [TipoUsuarioGuard],
         canLoad: [TipoUsuarioGuard]
      },
      {
        path: "funcionario",
        loadChildren:
          "../app/admin/funcionario/funcionario-admin.module#FuncionarioAdminModule",
            canActivate: [TipoUsuarioGuard],
            canLoad: [TipoUsuarioGuard]
      },
      {
        path: "aluno",
        loadChildren:
          "../app/admin/aluno/aluno-admin.module#AlunoAdminModule",
             canActivate: [TipoUsuarioGuard],
             canLoad: [TipoUsuarioGuard]
      },
      {
        path: "funcao",
        loadChildren: "../app/admin/funcao/funcao-admin.module#FuncaoAdminModule",
        canActivate: [TipoUsuarioGuard],
        canLoad: [TipoUsuarioGuard]
      },
      {
        path: "serie",
        loadChildren: "../app/admin/serie/serie-admin.module#SerieAdminModule",
        canActivate: [TipoUsuarioGuard],
        canLoad: [TipoUsuarioGuard]
      },
      {
        path: "disciplina",
        loadChildren:
          "../app/admin/disciplina/disciplina-admin.module#DisciplinaAdminModule",
        canActivate: [TipoUsuarioGuard],
        canLoad: [TipoUsuarioGuard]
      },
      {
        path: "departamento",
        loadChildren:
          "../app/admin/departamento/departamento-admin.module#DepartamentoAdminModule",
        canActivate: [TipoUsuarioGuard],
        canLoad: [TipoUsuarioGuard]
      },
      {
        path: "ocorrencia",
        loadChildren:
          "../app/admin/ocorrencia/ocorrencia-admin.module#OcorrenciaAdminModule",
        canActivate: [TipoUsuarioGuard],
        canLoad: [TipoUsuarioGuard]
      },

      {
        path: "tipo-ocorrencia",
        loadChildren:
          "../app/admin/tipo-ocorrencia/tipo-ocorrencia-admin.module#TipoOcorrenciaAdminModule",
        canActivate: [TipoUsuarioGuard],
        canLoad: [TipoUsuarioGuard]
      },
      {
        path: "rotina",
        loadChildren: "../app/admin/rotina/rotina-admin.module#RotinaAdminModule",
        canActivate: [TipoUsuarioGuard],
        canLoad: [TipoUsuarioGuard]
      },
      {
        path: "conselho",
        loadChildren: "../app/admin/conselho/conselho-admin.module#ConselhoAdminModule",
        canActivate: [TipoUsuarioGuard],
        canLoad: [TipoUsuarioGuard]
      },
      {
        path: "turma",
        loadChildren: "../app/admin/turma-admin/turma-admin.module#TurmaAdminModule",
        canActivate: [TipoUsuarioGuard],
        canLoad: [TipoUsuarioGuard]
      }
    ]
  },
  {
    path: "professor",
    component: HomeProfessorLayoutComponent,
     canActivate: [TipoUsuarioGuard],
     canLoad: [TipoUsuarioGuard],
    children: [
      {
        path: "",
        component: HomeProfessorComponent,
         canActivate: [TipoUsuarioGuard],
         canLoad: [TipoUsuarioGuard]
      },


      {
        path: "rotina",
        loadChildren: "../app/professor/rotina/rotina-professor.module#RotinaProfessorModule",
        canActivate: [TipoUsuarioGuard],
        canLoad: [TipoUsuarioGuard]
      },

    ]
  },
   {
    path: "",
    component: LoginLayoutComponent,
    children: [
      {
        
        path: "login",
        component: LoginComponent,
        
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(appRouting)],

  exports: [RouterModule]
})
export class AppRoutingModule {}
