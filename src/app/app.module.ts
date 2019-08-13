import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MenuEsquerdoAdminComponent } from './components/menu-esquerdo-admin/menu-esquerdo-admin.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { MenuTopoComponent } from './components/menu-topo/menu-topo.component';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/util/AuthInterceptor';
import { Ng2LoadingSpinnerModule } from 'ng2-loading-spinner';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MenuEsquerdoProfessorComponent } from './components/menu-esquerdo-professor/menu-esquerdo-professor.component';
import { HomeProfessorLayoutComponent } from './layouts/home-layout-professor/home-professor-layout.component';
import { HomeProfessorComponent } from './components/home-professor/home-professor.component';




@NgModule({
  declarations: [
    AppComponent,
    MenuEsquerdoAdminComponent,
    MenuEsquerdoProfessorComponent,
    HomeAdminComponent,
    HomeProfessorComponent,
    HomeLayoutComponent,
    LoginLayoutComponent ,
    AdminLayoutComponent ,
    HomeProfessorLayoutComponent ,
    LoginComponent,
    MenuTopoComponent,


  ],
  imports: [
    CommonModule,
    SharedModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    Ng2LoadingSpinnerModule.forRoot({}),


  ],
  exports:[

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
      },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
