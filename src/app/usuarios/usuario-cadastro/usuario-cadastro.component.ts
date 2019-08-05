import { FormValidations } from '../../shared/forms-validations';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { Component, OnInit } from '@angular/core';

import { UsuarioFiltro } from '../usuario.service';
import { Title } from '@angular/platform-browser';


import { Usuario } from '../../core/model';
import { UsuarioService } from '../usuario.service';

import { ErrorHandlerService } from '../../core/error-handler.service';


@Component({
  selector: 'app-usuario-cadastro',
  templateUrl: './usuario-cadastro.component.html',
  styleUrls: ['./usuario-cadastro.component.css']
})
export class UsuarioCadastroComponent implements OnInit {

  usuario = new Usuario();
  totalRegistros = 0;
  filtro = new UsuarioFiltro();
  exbindoProgressBar = false;
  formulario: FormGroup;



  constructor(
    private usuarioService: UsuarioService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private title: Title) { }

  ngOnInit() {

    this.configurarFormulario();


  const idUsuario = this.route.snapshot.params['codigo'];
  this.title.setTitle(`Novo Usuário`);
   if (idUsuario > 0) {
      this.carregarUsuario(idUsuario);
    }
  }


  configurarFormulario() {
    this.formulario = this.formBuilder.group({
        codigo: [],
        nome: ['', [
            Validators.required, Validators.minLength(1), Validators.maxLength(128)]],
            emailGroup: this.formBuilder.group({
              email: ['', [
                  Validators.required,
                  Validators.email
              ]],
              confirmarEmail: ['', Validators.required]
          }, { validator: FormValidations.childrenEqual})
    });
}

carregarUsuario(codigo: number) {
  this.usuarioService.buscarPorCodigo(codigo)
    .then(usuario => {
      this.usuario = usuario;
      this.atualizarTituloEdicao();
    })
    .catch(erro => this.errorHandler.handle(erro));
}


salvar() {
  if (this.editando) {
    this.atualizarUsuario();
  } else {
    this.adicionarUsuario();
  }
}


adicionarUsuario() {
  this.usuario.senha = 'temporaria';
  this.exbindoProgressBar = true;
  this.usuarioService.adicionar(this.formulario.value)
  .then(usuarioAdicionado => {

    this.messageService.add({severity: 'success', detail: 'Usuário salvo com sucesso.'});
    this.router.navigate(['/usuarios', usuarioAdicionado.codigo]);
    this.exbindoProgressBar = false;
  })
  .catch(erro => this.errorHandler.handle(erro));

}

atualizarUsuario() {
  this.usuarioService.atualizar(this.formulario.value)
  .then(usuario => {
   this.usuario = usuario;
   this.messageService.add({severity: 'success', detail: 'Usuário atualizado com sucesso.'});
   this.atualizarTituloEdicao();
  })
  .catch(erro => this.errorHandler.handle(erro));

}

get editando() {
  return Boolean(this.usuario.codigo);
}

novo(form: FormControl) {
  form.reset();
  setTimeout(function() {
    this.usuario = new Usuario();
  }.bind(this), 1);
  this.router.navigate(['/usuarios/novo']);
}

atualizarTituloEdicao() {
  this.title.setTitle(`Edição de ação: ${this.usuario.nome}`);
}


}

