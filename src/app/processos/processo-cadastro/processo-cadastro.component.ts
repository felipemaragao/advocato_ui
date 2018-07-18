import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { Title } from '@angular/platform-browser';

import { ProcessoService } from '../processo.service';
import { Processo, Andamento, } from '../../core/model';
import { PessoaService } from './../../pessoas/pessoa.service';
import { ComarcaService} from './../../comarcas/comarca.service';
import { CompetenciaService} from './../../competencias/competencia.service';
import { VaraService} from './../../varas/vara.service';

import { ErrorHandlerService } from '../../core/error-handler.service';
import { AcaoService } from '../../acoes/acao.service';
import { Component, OnInit } from '@angular/core';
import { StatusEscritorioService } from '../../status-escritorios/status-escritorio.service';
import { LitiganteService } from './../../litigantes/litigante.service';
import { UsuarioService } from './../../usuarios/usuario.service';
import { FaseProcessoService } from './../../fases-processo/fase-processo.service';

import { StatusEscritorio } from './../../core/model';



@Component({
  selector: 'app-processo-cadastro',
  templateUrl: './processo-cadastro.component.html',
  styleUrls: ['./processo-cadastro.component.css']
})
export class ProcessoCadastroComponent implements OnInit {

  processo = new Processo();

  totalRegistros = 0;
  tiposAcao: any[];
  pessoasCliente: any[];
  pessoasContraria: any[];
  pessoasIndicacao: any[];
  comarcas: any[];
  competencias: any[];
  varas: any[];
  litigantes: any[];
  statusEscritorios: any[];
  usuarios: any[];
  fasesProcesso: any[];

  comarcaSelecionada: number;
  competenciaSelecionada: number;
  pessoaClienteSelecionada: number;


  tiposProcesso = [
    { label: 'Judicial', value: 'JUDICIAL' },
    { label: 'Administrativo', value: 'ADMINISTRATIVO' },
  ];

  formulario: FormGroup;

  constructor(private acaoSevice: AcaoService,
              private pessoaService: PessoaService,
              private comarcaService: ComarcaService,
              private competenciaService: CompetenciaService,
              private varaService: VaraService,
              private errorHandler: ErrorHandlerService,
              private processoService: ProcessoService,
              private litiganteService: LitiganteService,
              private statusEscritorioService: StatusEscritorioService,
              private faseProcessoService: FaseProcessoService,
              private usuarioService: UsuarioService,
              private messageService: MessageService,
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private title: Title) { }

  pt_BR: any;

    status = [
      {label: 'Ativo', value: 'Ativo'},
      {label: 'Inativo', value: 'Inativo'},
    ];


     ngOnInit() {
      this.configurarFormulario();
      this.carregarTipoAcao();
      this.carregarPessoasCliente();
      this.carregarPessoasContraria();

      this.carregarLitigantes();
      this.carregarStatusEscritorio();
      this.carregarFaseProcesso();
      this.carregarPessoasIndicacao();
      this.carregarUsuarios();

      this.carregarComarca();

        this.pt_BR = {
          firstDayOfWeek: 0,
          dayNames: [ "Domingo", "Segunda","Terça","Quarta","Quinta","Sexta","Sábado" ],
          dayNamesShort: [ "dom","seg","ter","qua","qui","sex","sáb" ],
          dayNamesMin: [ "D","S","T","Q","Q","S","S" ],
          monthNames: [ "Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro" ],
          monthNamesShort: [ "Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez" ]
        };

        const idProcesso = this.route.snapshot.params['codigo'];
        this.title.setTitle(`Novo Processo`);

        if (idProcesso > 0) {
          this.carregarProcesso(idProcesso);
        }
    }

    atualizarTituloEdicao() {
      this.title.setTitle(`Edição de Processo: ${this.formulario.get('numeroProcesso').value}`);
    }

    carregarProcesso(codigo: number) {
      this.processoService.buscarPorCodigo(codigo)
      .then(processo => {
        this.formulario.patchValue(processo);

        this.comarcaSelecionada = (processo.vara) ?
        processo.vara.comarca.codigo : null;


        this.competenciaSelecionada = (processo.vara) ?
        processo.vara.competencia.codigo : null;

        if (this.comarcaSelecionada){
          this.carregarCompetencia();
          this.carregarVaras();
        }

        this.atualizarTituloEdicao();

      })
      .catch(erro => this.errorHandler.handle(erro));

    }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      codigo: [],
      numeroProcesso: [null, null ],
      dataAjuizamento: [null, Validators.required ],
      dataCadastro: [null, Validators.required ],

      tipoAcao:  this.formBuilder.group({
        codigo: [null, Validators.required ],
        descricao: []
      }),

      comarca:  this.formBuilder.group({
        codigo: [null, Validators.required ],
        nome: []
      }),

      competencia:  this.formBuilder.group({
        codigo: [null, Validators.required ],
        nome: []
      }),

      vara:  this.formBuilder.group({
        codigo: [null, Validators.required ],
        nome: []
      }),



      pessoaCliente: this.formBuilder.group({
          codigo: [null, Validators.required ],
          nome: []
      }),

      litigante: this.formBuilder.group({
        codigo: [null, Validators.required ],
        descricaoAutor: []
      }),

      pessoaContraria: this.formBuilder.group({
        codigo: [null, Validators.required ],
        nome: []
      }),

      pessoaIndicacao: this.formBuilder.group({
        codigo: [null, Validators.required ],
        nome: []
      }),

      statusEscritorio:  this.formBuilder.group({
        codigo: [null, Validators.required ],
        nome: []
      }),

      faseProcesso:  this.formBuilder.group({
        codigo: [null, Validators.required ],
        nome: []
      }),


      usuarioCadastro:  this.formBuilder.group({
        id: [null, Validators.required ],
        nome: []
      }),

      valorAjuizado: ['0.00', Validators.required ],
      valorPago: ['0.00', null ],
      valorProvisionado: ['0.00', null ],
      numeroExterno: [null, null],
      resumo: [null, [this.validarObrigatoriedade, this.validarTamanhoMinimo(5)]]
      });

  }

  validarObrigatoriedade(input: FormControl) {
    return (input.value ? null : {obrigatoriedade: true});
  }

  validarTamanhoMinimo(valor: number) {
    return (input: FormControl) => {
      return (!input.value || input.value.length >= valor) ? null : { tamanhoMinimo: {tamanho: valor}};
    };
  }

  carregarUsuarios() {
    return this.usuarioService.listarTodos()
          .then(usuarios => {
            this.usuarios = usuarios.map(c => {
              return  {label: c.nome, value: c.id};
            });

    })
    .catch(erro => this.errorHandler.handle(erro));

  }

  carregarTipoAcao() {
    return this.acaoSevice.listarTodas()
          .then(tiposAcao => {
            this.tiposAcao = tiposAcao.map(c => {
              return  {label: c.descricao, value: c.codigo};
            });

    })
    .catch(erro => this.errorHandler.handle(erro));

  }

  carregarStatusEscritorio() {
    return this.statusEscritorioService.listarTodas()
          .then(statusEscritorios => {
            this.statusEscritorios = statusEscritorios.map(c => {
              return  {label: c.nome, value: c.codigo};
            });

    })
    .catch(erro => this.errorHandler.handle(erro));

  }

  carregarFaseProcesso() {
    return this.faseProcessoService.listarTodas()
          .then(fasesProcesso => {
            this.fasesProcesso = fasesProcesso.map(c => {
              return  {label: c.nome, value: c.codigo};
            });

    })
    .catch(erro => this.errorHandler.handle(erro));

  }
  carregarPessoasCliente() {
    return this.pessoaService.listarTodas()
          .then(pessoa => {
            this.pessoasCliente = pessoa.map(p => {
              return  {label: p.nome, value: p.codigo};
            });

    })
    .catch(erro => this.errorHandler.handle(erro));

  }

  carregarLitigantes() {
    return this.litiganteService.listarTodas()
          .then(litigante => {
            this.litigantes = litigante.map(p => {
              return  {label: p.descricaoAutor, value: p.codigo};
            });

    })
    .catch(erro => this.errorHandler.handle(erro));

  }

  carregarPessoasContraria() {
    return this.pessoaService.listarTodas()
          .then(pessoa => {
            this.pessoasContraria = pessoa.map(p => {
              return  {label: p.nome, value: p.codigo};
            });

    })
    .catch(erro => this.errorHandler.handle(erro));

  }

  carregarPessoasIndicacao() {
    return this.pessoaService.listarTodas()
          .then(pessoa => {
            this.pessoasIndicacao = pessoa.map(p => {
              return  {label: p.nome, value: p.codigo};
            });

    })
    .catch(erro => this.errorHandler.handle(erro));

  }


  carregarComarca() {
    this.processoService.listarComarcas().then(comarca => {
      this.comarcas = comarca.map(p => ({ label: p.nome, value: p.codigo }));
    })
    .catch(erro => this.errorHandler.handle(erro));
  }



  carregarCompetencia() {
    this.processoService.listarCompetencias().then(competencia => {
      this.competencias = competencia.map(p => ({ label: p.nome, value: p.codigo }));
    })
    .catch(erro => this.errorHandler.handle(erro));

  }

  carregarVaras() {

    this.processoService.pesquisarComarcaCompetencia(this.comarcaSelecionada,
                    this.competenciaSelecionada)
    .then(vara => {
      this.varas = vara.map(p => ({ label: p.nome, value: p.codigo }));
    })
    .catch(erro => this.errorHandler.handle(erro));
    }


  adicionarProcesso() {
    this.processoService.adicionar(this.formulario.value)
      .then(processoAdicionado => {

        this.messageService.add({severity: 'success', detail: 'Processo adicionado com sucesso.'});

        // form.reset();
        // this.lancamento = new Lancamento();
        this.router.navigate(['/processos', processoAdicionado.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }


  atualizarProcesso() {
    this.processoService.atualizar(this.formulario.value)
      .then(processo => {
        // this.lancamento = lancamento;
        this.formulario.patchValue(processo);

        this.messageService.add({severity: 'success', detail: 'Processo atualizado com sucesso.'});
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar() {
    this.processoService.adicionar(this.formulario.value)
    .then(() => {
      this.messageService.add({severity: 'success', detail: 'Processo salvo com sucesso.'});
      this.formulario.reset();
    //  form.reset();
    //  this.processo = new Processo();

    })
    .catch(erro => this.errorHandler.handle(erro));

  }

  novo() {
    this.formulario.reset();

    setTimeout(function() {
      this.processo = new Processo();
    }.bind(this), 1);

    this.router.navigate(['/processos/novo']);
  }

}
