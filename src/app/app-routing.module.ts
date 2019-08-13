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
import { TipoUsuarioAdminGuard } from "./guards/tipo-usuario-admin.guard";

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
     canActivate: [TipoUsuarioAdminGuard],
     canLoad: [TipoUsuarioAdminGuard],
    children: [
      {
        path: "",
        component: HomeAdminComponent,
         canActivate: [TipoUsuarioAdminGuard],
         canLoad: [TipoUsuarioAdminGuard]
      },
      {
        path: "funcionario",
        loadChildren:
          "../app/admin/funcionario/funcionario-admin.module#FuncionarioAdminModule",
            canActivate: [TipoUsuarioAdminGuard],
            canLoad: [TipoUsuarioAdminGuard]
      },
      {
        path: "aluno",
        loadChildren:
          "../app/admin/aluno/aluno-admin.module#AlunoAdminModule",
             canActivate: [TipoUsuarioAdminGuard],
             canLoad: [TipoUsuarioAdminGuard]
      },
      {
        path: "funcao",
        loadChildren: "../app/admin/funcao/funcao-admin.module#FuncaoAdminModule",
        canActivate: [TipoUsuarioAdminGuard],
        canLoad: [TipoUsuarioAdminGuard]
      },
      {
        path: "serie",
        loadChildren: "../app/admin/serie/serie-admin.module#SerieAdminModule",
        canActivate: [TipoUsuarioAdminGuard],
        canLoad: [TipoUsuarioAdminGuard]
      },
      {
        path: "disciplina",
        loadChildren:
          "../app/admin/disciplina/disciplina-admin.module#DisciplinaAdminModule",
        canActivate: [TipoUsuarioAdminGuard],
        canLoad: [TipoUsuarioAdminGuard]
      },
      {
        path: "departamento",
        loadChildren:
          "../app/admin/departamento/departamento-admin.module#DepartamentoAdminModule",
        canActivate: [TipoUsuarioAdminGuard],
        canLoad: [TipoUsuarioAdminGuard]
      },
      {
        path: "ocorrencia",
        loadChildren:
          "../app/admin/ocorrencia/ocorrencia-admin.module#OcorrenciaAdminModule",
        canActivate: [TipoUsuarioAdminGuard],
        canLoad: [TipoUsuarioAdminGuard]
      },

      {
        path: "tipo-ocorrencia",
        loadChildren:
          "../app/admin/tipo-ocorrencia/tipo-ocorrencia-admin.module#TipoOcorrenciaAdminModule",
        canActivate: [TipoUsuarioAdminGuard],
        canLoad: [TipoUsuarioAdminGuard]
      },
      {
        path: "rotina",
        loadChildren: "../app/admin/rotina/rotina-admin.module#RotinaAdminModule",
        canActivate: [TipoUsuarioAdminGuard],
        canLoad: [TipoUsuarioAdminGuard]
      },
      {
        path: "conselho",
        loadChildren: "../app/admin/conselho/conselho-admin.module#ConselhoAdminModule",
        canActivate: [TipoUsuarioAdminGuard],
        canLoad: [TipoUsuarioAdminGuard]
      },
      {
        path: "turma",
        loadChildren: "../app/admin/turma-admin/turma-admin.module#TurmaAdminModule",
        canActivate: [TipoUsuarioAdminGuard],
        canLoad: [TipoUsuarioAdminGuard]
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
