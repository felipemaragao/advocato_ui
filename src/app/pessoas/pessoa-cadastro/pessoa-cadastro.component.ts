import { MessageService } from 'primeng/components/common/messageservice';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';


import { Component, OnInit } from '@angular/core';

import { CidadeFiltro } from '../../cidades/cidade.service';
import { Title } from '@angular/platform-browser';


import { Pessoa, Contato } from '../../core/model';
import { Cidade, Estado } from '../../core/model';

import { PessoaService } from '../pessoa.service';
import { CidadeService } from '../../cidades/cidade.service';
import { ErrorHandlerService } from '../../core/error-handler.service';


@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pt_BR: any;

  tipoPessoa = [
    {label: 'Física', value: 'Física'},
    {label: 'Jurídica', value: 'Jurídica'},
  ];


  pessoa = new Pessoa();

  filtro = new CidadeFiltro();

  totalRegistros = 0;

  constructor(
    private pessoaService: PessoaService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title) { }


    estados: any[];
    cidades: any[];
    estadoSelecionado: number;



  ngOnInit() {
    this.pt_BR = {
      firstDayOfWeek: 0,
      dayNames: [ "Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado" ],
      dayNamesShort: [ "dom","seg","ter","qua","qui","sex","sáb" ],
      dayNamesMin: [ "D","S","T","Q","Q","S","S" ],
      monthNames: [ "Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro" ],
      monthNamesShort: [ "Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez" ]
    };

    const idPessoa = this.route.snapshot.params['codigo'];
    this.title.setTitle(`Nova Pessoa`);

    if (idPessoa > 0) {
      this.carregarPessoa(idPessoa);
    }


    this.carregarEstados();
  }


  carregarEstados() {
    this.pessoaService.listarEstados().then(lista => {
      this.estados = lista.map(uf => ({ label: uf.nome, value: uf.codigo }));
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  carregarCidades() {
    this.pessoaService.pesquisarCidades(this.estadoSelecionado).then(lista => {
      this.cidades = lista.map(c => ({ label: c.nome, value: c.codigo }));
    })
    .catch(erro => this.errorHandler.handle(erro));
  }


  carregarPessoa(codigo: number) {
    this.pessoaService.buscarPorCodigo(codigo)
      .then(pessoa => {
        this.pessoa = pessoa;

        this.estadoSelecionado = (this.pessoa.endereco.cidade) ?
                this.pessoa.endereco.cidade.estado.codigo : null;

        if (this.estadoSelecionado) {
          this.carregarCidades();
        }

        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }


  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarPessoa(form);
    } else {
      this.adicionarPessoa(form);
    }
  }


  adicionarPessoa(form: FormControl) {
    this.pessoaService.adicionar(this.pessoa)
    .then(pessoaAdicionada => {

     this.messageService.add({severity: 'success', detail: 'Pessoa salva com sucesso.'});
     // form.reset();
     //  this.pessoa = new Pessoa();
     this.router.navigate(['/pessoas', pessoaAdicionada.codigo]);
    })
    .catch(erro => this.errorHandler.handle(erro));

  }

  atualizarPessoa(form: FormControl) {
    this.pessoaService.atualizar(this.pessoa)
    .then(pessoa => {
     this.pessoa = pessoa;

     this.messageService.add({severity: 'success', detail: 'Pessoa atualizada com sucesso.'});
     this.atualizarTituloEdicao();
    })
    .catch(erro => this.errorHandler.handle(erro));

  }

  get editando() {
    return Boolean(this.pessoa.codigo);
  }

  nova(form: FormControl) {
    form.reset();
    setTimeout(function() {
      this.pessoa = new Pessoa();
    }.bind(this), 1);
    this.router.navigate(['/pessoas/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de pessoa: ${this.pessoa.nome}`);
  }


}
