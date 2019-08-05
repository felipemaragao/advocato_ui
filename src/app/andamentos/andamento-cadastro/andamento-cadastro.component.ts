import { Title } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/components/common/messageservice';


import { ErrorHandlerService } from '../../core/error-handler.service';
import { TipoAndamentoService } from '../../tipos-andamento/tipo-andamento.service';
import { ProcessoService } from '../../processos/processo.service';
import { AdvogadoService } from '../../advogados/advogado.service';
import { Andamento } from '../../core/model';
import { AndamentoService } from '../andamento.service';
import { UsuarioService } from '../../usuarios/usuario.service';

@Component({
  selector: 'app-andamento-cadastro',
  templateUrl: './andamento-cadastro.component.html',
  styleUrls: ['./andamento-cadastro.component.css']
})
export class AndamentoCadastroComponent implements OnInit {

  tiposAndamento = [];
  processos = [];
  advogados = [];
  usuarios = [];
  uploadEmAndamento = false;
  // lancamento = new Lancamento();
  formulario: FormGroup;

  constructor(
    private tipoAndamentoService: TipoAndamentoService,
    private usuarioService: UsuarioService,
    private processoService: ProcessoService,
    private andamentoService: AndamentoService,
    private advogadoService: AdvogadoService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.configurarFormulario();

    const codigoAndamento = this.route.snapshot.params[`codigo`];

    this.title.setTitle('Novo andamento');

    if (codigoAndamento) {
      this.carregarAndamento(codigoAndamento);
    }

    this.carregarTiposAndamento();
    this.carregarProcessos();
    this.carregarAdvogados();
    this.carregarUsuarios();
  }

  antesUploadAnexo(event) {
    event.xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));

    this.uploadEmAndamento = true;
  }

  aoTerminarUploadAnexo(event) {
    const anexo = JSON.parse(event.xhr.response);

    this.formulario.patchValue({
      anexo: anexo.nome,
      urlAnexo: anexo.url
    });
    this.uploadEmAndamento = false;
  }

  erroUpload(event) {
    this.messageService.add({severity: 'error', detail: `Erro ao tentar enviar anexo!`});
    this.uploadEmAndamento = false;
  }


  removerAnexo() {
    this.formulario.patchValue({
      anexo: null,
      urlAnexo: null
    });
  }

  get nomeAnexo() {
    const nome = this.formulario.get('anexo').value;

    if (nome) {
      return nome.substring(nome.indexOf('_') + 1, nome.length);
    }

    return '';
  }

  get urlUploadAnexo() {
    return this.andamentoService.urlUploadAnexo();
  }


  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      codigo: [],

      dataAndamento: [ null, Validators.required ],
      dataCadastro: [ null, Validators.required ],
      dataFechado: [],
      descricaoAndamento: [],
      anexo: [],
      urlAnexo: [],

      processo: this.formBuilder.group({
        codigo: [ null, Validators.required ],
        numeroProcesso: []
      }),

      tipoAndamento: this.formBuilder.group({
        codigo: [ null, Validators.required ],
        descricao: []
      }),

      advogadoResponsavel: this.formBuilder.group({
        codigo: [ null, Validators.required ],
        nome: []
      }),

      usuarioCadastro: this.formBuilder.group({
        codigo: [ null, Validators.required ],
        nome: []
      }),

      usuarioFechamento: this.formBuilder.group({
        codigo: [ null, Validators.required ],
        nome: []
      })

    });
  }

  validarObrigatoriedade(input: FormControl) {
    return (input.value ? null : { obrigatoriedade: true });
  }

  validarTamanhoMinimo(valor: number) {
    return (input: FormControl) => {
      return (!input.value || input.value.length >= valor) ? null : { tamanhoMinimo: { tamanho: valor } };
    };
  }

  get editando() {
    return Boolean(this.formulario.get('codigo').value);
  }

  carregarAndamento(codigo: number) {
    this.andamentoService.buscarPorCodigo(codigo)
      .then(andamento => {
        // this.lancamento = lancamento;
        this.formulario.patchValue(andamento);
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }


  salvar() {
    if (this.editando) {
      this.atualizarAndamento();
    } else {
      this.adicionarAndamento();
    }
  }

  adicionarAndamento() {
    this.andamentoService.adicionar(this.formulario.value)
      .then(andamentoAdicionado => {
        this.messageService.add({severity: 'success', detail: `Andamento adicionado com sucesso!`});
        // form.reset();
        // this.lancamento = new Lancamento();
        this.router.navigate(['/andamentos', andamentoAdicionado.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarAndamento() {
    this.andamentoService.atualizar(this.formulario.value)
      .then(andamento => {
        // this.lancamento = lancamento;
        this.formulario.patchValue(andamento);
        this.messageService.add({severity: 'success', detail: `Andamento alterado com sucesso!`});
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarTiposAndamento() {
    return this.tipoAndamentoService.listarTodas()
      .then(tiposAndamento => {
        this.tiposAndamento = tiposAndamento
          .map(c => ({ label: c.descricao, value: c.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarAdvogados() {
    return this.advogadoService.listarTodos()
      .then(advogados => {
        this.advogados = advogados
          .map(c => ({ label: c.nome, value: c.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarUsuarios() {
    return this.usuarioService.listarTodos()
      .then(usuarios => {
        this.usuarios = usuarios
          .map(c => ({ label: c.nome, value: c.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarProcessos() {
    this.processoService.listarTodas()
      .then(processos => {
        this.processos = processos
          .map(p => ({ label: p.numeroProcesso, value: p.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  novo() {
    this.formulario.reset();

    setTimeout(function() {
      this.andamento = new Andamento();
    }.bind(this), 1);

    this.router.navigate(['/andamentos/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de andamento: ${this.formulario.get('descricaoAndamento').value}`);
  }
}
