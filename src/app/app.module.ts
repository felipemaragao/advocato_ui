import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SegurancaModule } from './seguranca/seguranca.module';
import { AppRoutingModule } from './app-routing.module';

import { APP_BASE_HREF } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';



import {AppMenuComponent, AppSubMenuComponent} from './app.menu.component';
import {AppTopbarComponent} from './app.topbar.component';
import {AppFooterComponent} from './app.footer.component';


import { MessagingService } from './shared/messaging.service';
import { environment } from '../environments/environment';
import { AsyncPipe } from '@angular/common';



import { AccordionModule } from 'primeng/primeng';
import {AutoCompleteModule} from 'primeng/primeng';
import {BreadcrumbModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/primeng';
import {CalendarModule} from 'primeng/primeng';
import {CarouselModule} from 'primeng/primeng';
import {ChartModule} from 'primeng/primeng';
import {CheckboxModule} from 'primeng/primeng';
import {ChipsModule} from 'primeng/primeng';
import {CodeHighlighterModule} from 'primeng/primeng';
import {ConfirmDialogModule} from 'primeng/primeng';
import {ColorPickerModule} from 'primeng/primeng';
import {SharedModule} from 'primeng/primeng';
import {ContextMenuModule} from 'primeng/primeng';
import {DataGridModule} from 'primeng/primeng';
import {DataListModule} from 'primeng/primeng';
import {DataScrollerModule} from 'primeng/primeng';
import {DialogModule} from 'primeng/primeng';
import {DragDropModule} from 'primeng/primeng';
import {DropdownModule} from 'primeng/primeng';
import {EditorModule} from 'primeng/primeng';
import {FieldsetModule} from 'primeng/primeng';
import {FileUploadModule} from 'primeng/primeng';
import {GalleriaModule} from 'primeng/primeng';
import {GMapModule} from 'primeng/primeng';
import {GrowlModule} from 'primeng/primeng';
import {InputMaskModule} from 'primeng/primeng';
import {InputSwitchModule} from 'primeng/primeng';
import {InputTextModule} from 'primeng/primeng';
import {InputTextareaModule} from 'primeng/primeng';
import {LightboxModule} from 'primeng/primeng';
import {ListboxModule} from 'primeng/primeng';
import {MegaMenuModule} from 'primeng/primeng';
import {MenuModule} from 'primeng/primeng';
import {MenubarModule} from 'primeng/primeng';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {MultiSelectModule} from 'primeng/primeng';
import {OrderListModule} from 'primeng/primeng';
import {OrganizationChartModule} from 'primeng/primeng';
import {OverlayPanelModule} from 'primeng/primeng';
import {PaginatorModule} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import {PanelMenuModule} from 'primeng/primeng';
import {PasswordModule} from 'primeng/primeng';
import {PickListModule} from 'primeng/primeng';
import {ProgressBarModule} from 'primeng/primeng';
import {RadioButtonModule} from 'primeng/primeng';
import {RatingModule} from 'primeng/primeng';
import {ScheduleModule} from 'primeng/primeng';
import {ScrollPanelModule} from 'primeng/primeng';
import {SelectButtonModule} from 'primeng/primeng';
import {SlideMenuModule} from 'primeng/primeng';
import {SliderModule} from 'primeng/primeng';
import {SpinnerModule} from 'primeng/primeng';
import {SplitButtonModule} from 'primeng/primeng';
import {StepsModule} from 'primeng/primeng';
import {TableModule} from 'primeng/table';
import {TabMenuModule} from 'primeng/primeng';
import {TabViewModule} from 'primeng/primeng';
import {TerminalModule} from 'primeng/primeng';
import {TieredMenuModule} from 'primeng/primeng';
import {ToggleButtonModule} from 'primeng/primeng';
import {ToolbarModule} from 'primeng/primeng';
import {TooltipModule} from 'primeng/primeng';
import {TreeModule} from 'primeng/primeng';
import {TreeTableModule} from 'primeng/primeng';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { AndamentoCadastroComponent } from './andamentos/andamento-cadastro/andamento-cadastro.component';
import { AndamentosPesquisaComponent } from './andamentos/andamentos-pesquisa/andamentos-pesquisa.component';
import { TipoAndamentoCadastroComponent } from './tipos-andamento/tipo-andamento-cadastro/tipo-andamento-cadastro.component';
import { TiposAndamentoPesquisaComponent } from './tipos-andamento/tipos-andamento-pesquisa/tipos-andamento-pesquisa.component';
import { AdvogadoCadastroComponent } from './advogados/advogado-cadastro/advogado-cadastro.component';
import { AdvogadosPesquisaComponent } from './advogados/advogados-pesquisa/advogados-pesquisa.component';
import { AcaoCadastroComponent } from './acoes/acao-cadastro/acao-cadastro.component';
import { AcoesPesquisaComponent } from './acoes/acoes-pesquisa/acoes-pesquisa.component';
import { CidadeCadastroComponent } from './cidades/cidade-cadastro/cidade-cadastro.component';
import { CidadesPesquisaComponent } from './cidades/cidades-pesquisa/cidades-pesquisa.component';
import { ComarcaCadastroComponent } from './comarcas/comarca-cadastro/comarca-cadastro.component';
import { ComarcasPesquisaComponent } from './comarcas/comarcas-pesquisa/comarcas-pesquisa.component';
import { CompetenciaCadastroComponent } from './competencias/competencia-cadastro/competencia-cadastro.component';
import { CompetenciasPesquisaComponent } from './competencias/competencias-pesquisa/competencias-pesquisa.component';
import { EscritorioCadastroComponent } from './escritorios/escritorio-cadastro/escritorio-cadastro.component';
import { EscritoriosPesquisaComponent } from './escritorios/escritorios-pesquisa/escritorios-pesquisa.component';
import { EstadoCadastroComponent } from './estados/estado-cadastro/estado-cadastro.component';
import { EstadosPesquisaComponent } from './estados/estados-pesquisa/estados-pesquisa.component';
import { FaseCadastroComponent } from './fases-processo/fase-cadastro/fase-cadastro.component';
import { FasesPesquisaComponent } from './fases-processo/fases-pesquisa/fases-pesquisa.component';
import { LitiganteCadastroComponent } from './litigantes/litigante-cadastro/litigante-cadastro.component';
import { LitigantesPesquisaComponent } from './litigantes/litigantes-pesquisa/litigantes-pesquisa.component';
import { LocalizacaoCadastroComponent } from './localizacoes/localizacao-cadastro/localizacao-cadastro.component';
import { LocalizacoesPesquisaComponent } from './localizacoes/localizacoes-pesquisa/localizacoes-pesquisa.component';
import { OcupacaoCadastroComponent } from './ocupacoes/ocupacao-cadastro/ocupacao-cadastro.component';
import { OcupacoesPesquisaComponent } from './ocupacoes/ocupacoes-pesquisa/ocupacoes-pesquisa.component';
import { PessoaCadastroComponent } from './pessoas/pessoa-cadastro/pessoa-cadastro.component';
import { PessoasPesquisaComponent } from './pessoas/pessoas-pesquisa/pessoas-pesquisa.component';
import { ProcessoCadastroComponent } from './processos/processo-cadastro/processo-cadastro.component';
import { ProcessosPesquisaComponent } from './processos/processos-pesquisa/processos-pesquisa.component';
import { StatusEscritorioCadastroComponent } from './status-escritorios/status-escritorio-cadastro/status-escritorio-cadastro.component';
import { StatusEscritoriosPesquisaComponent } from './status-escritorios/status-escritorios-pesquisa/status-escritorios-pesquisa.component';
import { UsuarioCadastroComponent } from './usuarios/usuario-cadastro/usuario-cadastro.component';
import { UsuariosPesquisaComponent } from './usuarios/usuarios-pesquisa/usuarios-pesquisa.component';
import { VaraCadastroComponent } from './varas/vara-cadastro/vara-cadastro.component';
import { VarasPesquisaComponent } from './varas/varas-pesquisa/varas-pesquisa.component';
@NgModule({
  declarations: [
    AppComponent,
    AppMenuComponent,
    AppSubMenuComponent,
    AppTopbarComponent,
    AppFooterComponent,
    DashboardComponent,
    AndamentoCadastroComponent,
    AndamentosPesquisaComponent,
    TipoAndamentoCadastroComponent,
    TiposAndamentoPesquisaComponent,
    AdvogadoCadastroComponent,
    AdvogadosPesquisaComponent,
    AcaoCadastroComponent,
    AcoesPesquisaComponent,
    CidadeCadastroComponent,
    CidadesPesquisaComponent,
    ComarcaCadastroComponent,
    ComarcasPesquisaComponent,
    CompetenciaCadastroComponent,
    CompetenciasPesquisaComponent,
    EscritorioCadastroComponent,
    EscritoriosPesquisaComponent,
    EstadoCadastroComponent,
    EstadosPesquisaComponent,
    FaseCadastroComponent,
    FasesPesquisaComponent,
    LitiganteCadastroComponent,
    LitigantesPesquisaComponent,
    LocalizacaoCadastroComponent,
    LocalizacoesPesquisaComponent,
    OcupacaoCadastroComponent,
    OcupacoesPesquisaComponent,
    PessoaCadastroComponent,
    PessoasPesquisaComponent,
    ProcessoCadastroComponent,
    ProcessosPesquisaComponent,
    StatusEscritorioCadastroComponent,
    StatusEscritoriosPesquisaComponent,
    UsuarioCadastroComponent,
    UsuariosPesquisaComponent,
    VaraCadastroComponent,
    VarasPesquisaComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CoreModule,
    SegurancaModule,
    AppRoutingModule,
     AccordionModule,
    AutoCompleteModule,
    BreadcrumbModule,
    ButtonModule,
    CalendarModule,
    CarouselModule,
    ChartModule,
    CheckboxModule,
    ChipsModule,
    CodeHighlighterModule,
    ConfirmDialogModule,
    ColorPickerModule,
    SharedModule,
    ContextMenuModule,
    DataGridModule,
    DataListModule,
    DataScrollerModule,
    DialogModule,
    DragDropModule,
    DropdownModule,
    EditorModule,
    FieldsetModule,
    FileUploadModule,
    GalleriaModule,
    GMapModule,
    GrowlModule,
    InputMaskModule,
    InputSwitchModule,
    InputTextModule,
    InputTextareaModule,
    LightboxModule,
    ListboxModule,
    MegaMenuModule,
    MenuModule,
    MenubarModule,
    MessagesModule,
    MessageModule,
    MultiSelectModule,
    OrderListModule,
    OrganizationChartModule,
    OverlayPanelModule,
    PaginatorModule,
    PanelModule,
    PanelMenuModule,
    PasswordModule,
    PickListModule,
    ProgressBarModule,
    RadioButtonModule,
    RatingModule,
    ScheduleModule,
    ScrollPanelModule,
    SelectButtonModule,
    SlideMenuModule,
    SliderModule,
    SpinnerModule,
    SplitButtonModule,
    StepsModule,
    TableModule,
    TabMenuModule,
    TabViewModule,
    TerminalModule,
    TieredMenuModule,
    ToggleButtonModule,
    ToolbarModule,
    TooltipModule,
    TreeModule,
    TreeTableModule,

  ],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}, MessagingService, AsyncPipe],

  bootstrap: [AppComponent],

})
export class AppModule { }
