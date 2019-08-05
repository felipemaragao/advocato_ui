import { Title } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/components/common/messageservice';

import { ErrorHandlerService } from '../../core/error-handler.service';
import { TipoAndamentoService } from '../../tipos-andamento/tipo-andamento.service';
import { ProcessoService } from '../processo.service';
import { AdvogadoService } from '../../advogados/advogado.service';
import { Andamento } from '../../core/model';
import { AndamentoService } from '../../andamentos/andamento.service';
import { UsuarioService } from '../../usuarios/usuario.service';




@Component({
  selector: 'app-processo-cadastro-acompanhamento',
  templateUrl: './processo-cadastro-acompanhamento.component.html',
  styleUrls: ['./processo-cadastro-acompanhamento.component.css']
})
export class ProcessoCadastroAcompanhamentoComponent implements OnInit {

  @Input() andamentos: Array<Andamento>;
  andamento: Andamento;
  exbindoFormularioAndamento = false;
  andamentoIndex: number;


  tiposAndamento = [];
  processos = [];
  advogados = [];
  usuarios = [];
  uploadEmAndamento = false;
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
    this.carregarTiposAndamento();
    this.carregarAdvogados();
    this.carregarUsuarios();
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



  prepararNovoAndamento() {
    this.exbindoFormularioAndamento = true;
    this.andamento = new Andamento();
    this.andamentoIndex = this.andamentos.length;
  }

  prepararEdicaoAndamento(andamento: Andamento, index: number) {
    this.andamento = this.clonarAndamento(andamento);
    this.exbindoFormularioAndamento = true;
    this.andamentoIndex = index;
  }

  confirmarAndamento(frm: FormControl) {
    this.andamentos[this.andamentoIndex] = this.clonarAndamento(this.andamento);

    this.exbindoFormularioAndamento = false;

    frm.reset();
  }

  removerAndamento(index: number) {
    this.andamentos.splice(index, 1);
  }

  clonarAndamento(andamento: Andamento): Andamento {
    return new Andamento(andamento.codigo, andamento.processo, andamento.dataCadastro,
      andamento.dataFechado, andamento.dataAndamento, andamento.advogadoResponsavel,
      andamento.tipoAndamento, andamento.usuarioCadastro, andamento.usuarioFechamento,
      andamento.descricaoAndamento, andamento.anexo);
  }

  get editando() {
    return this.andamento && this.andamento.codigo;
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


}
