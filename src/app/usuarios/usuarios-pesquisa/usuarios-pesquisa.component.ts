import { Title } from '@angular/platform-browser';
import { ErrorHandlerService } from '../../core/error-handler.service';


import { LazyLoadEvent } from 'primeng/components/common/api';
import { UsuarioService, UsuarioFiltro } from '../usuario.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';
import { ConfirmationService } from 'primeng/components/common/api';
import { AuthService } from '../../seguranca/auth.service';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-usuarios-pesquisa',
  templateUrl: './usuarios-pesquisa.component.html',
  styleUrls: ['./usuarios-pesquisa.component.css']
})
export class UsuariosPesquisaComponent implements OnInit {


  filtro = new UsuarioFiltro();
  totalRegistros = 0;

  usuarios = [];

  value = 0;
  interval: any;

  exbindoProgressBar = false;

  @ViewChild('tabela', {static: true}) grid;

  constructor(private usuarioService: UsuarioService,
              private messageService: MessageService,
              private confirmation: ConfirmationService,
              private errorHandler: ErrorHandlerService,
              private title: Title,
              private auth: AuthService) {

  }

  ngOnInit() {
    this.interval = setInterval(() => {
      this.value = this.value + Math.floor(Math.random() * 10) + 1;
      if (this.value >= 100) {
          this.value = 100;
          clearInterval(this.interval);
          this.interval = null;
      }
    }, 2000);

    this.title.setTitle('Pesquisa de Usuários');
  }

  pesquisar(pagina= 0) {
    console.log(this.filtro);
    this.filtro.pagina = pagina;
      this.usuarioService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.usuarios = resultado.usuarios;
       })
       .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);

  }

  confirmarExclusao(usuario: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(usuario);
      }
    });
  }


  confirmarResetarSenha(usuario: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja resetar senha do usuário?',
      accept: () => {
        this.resetarSenha(usuario);
      }
    });
  }


  resetarSenha(usuario: any) {

    this.exbindoProgressBar = true;

    const nomeUsuario = usuario.nome;
    this.usuarioService.resetarSenha(usuario.codigo)
    .then(() => {
      this.exbindoProgressBar = false;
      this.messageService.add({severity: 'success', detail: `Senha do  ${nomeUsuario} resetada com suceso!`});
      })
      .catch(erro => this.errorHandler.handle(erro));
  }



  excluir(usuario: any) {
    const nomeUsuario = usuario.nome;
    this.usuarioService.excluir(usuario.codigo)
    .then(() => {
      if (this.grid.first === 0) {
          this.pesquisar();
      } else {
          this.grid.first = 0;
      }

      this.messageService.add({severity: 'success', detail: `Senha do  ${nomeUsuario} excluído com suceso!`});
      })
      .catch(erro => this.errorHandler.handle(erro));


  }

}
