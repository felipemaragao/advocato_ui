import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Andamento } from '../../core/model';

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

  constructor() { }

  ngOnInit() {
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

}
