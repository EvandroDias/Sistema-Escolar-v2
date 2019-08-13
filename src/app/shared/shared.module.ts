import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RadioInputComponent } from "./radio-input/radio-input.component";
import { CampoControlErroComponent } from "./campo-control-erro/campo-control-erro.component";
import { ErrorMsgComponent } from "./error-msg/error-msg.component";
import { InputFieldComponent } from "./input-field/InputFieldComponent";
import { SelectFieldComponent } from "./select-field/select-field/select-field.component";
import { MaskDirective } from "./directives/mask.directive";
import { PaginatorModule } from 'primeng/paginator';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { CalendarModule } from 'primeng/calendar';
import { TextAreaFieldComponent } from "./textarea-field/textareaFieldComponent";
import { ChartsModule } from 'ng2-charts';
import { KzMaskDirective } from "./directives/masked-input/kz-mask.directive";
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CKEditorModule } from 'ng2-ckeditor';
import { TabelaHorarioRotinaComponent } from '../components/tabela-horario-rotina/tabela-horario-rotina.component';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MessagesModule,
    MessageModule,
    PaginatorModule,
    ToastModule,
    CKEditorModule,
    TabViewModule,
    ChartsModule,
    CalendarModule,
    ConfirmDialogModule
  ],

  declarations: [
    CampoControlErroComponent,
    ErrorMsgComponent,
    InputFieldComponent,
    TextAreaFieldComponent,
    SelectFieldComponent,
    //BaseFormComponent,
    KzMaskDirective,
    MaskDirective,
    // PaginacaoComponent,
    RadioInputComponent,
    TabelaHorarioRotinaComponent

  ],
  entryComponents: [],
  exports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TabViewModule,
    CKEditorModule,
    ChartsModule,
    PaginatorModule,
    TabelaHorarioRotinaComponent,
    ToastModule,
    CampoControlErroComponent,
    ErrorMsgComponent,
    InputFieldComponent,
    TextAreaFieldComponent,
    SelectFieldComponent,
    CalendarModule,
    KzMaskDirective,
    MaskDirective,
    RadioInputComponent,
    MessagesModule,
    MessageModule,
    ConfirmDialogModule
  ],
  providers: [
    ConfirmationService,
    MessageService
  ]
})
export class SharedModule { }
