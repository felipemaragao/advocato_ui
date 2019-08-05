import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';

import { MessageService } from 'primeng/components/common/messageservice';
import { Component, OnInit } from '@angular/core';

import { ComarcaFiltro } from '../comarca.service';
import { Title } from '@angular/platform-browser';


import { Comarca } from '../../core/model';
import { ComarcaService } from '../comarca.service';

import { ErrorHandlerService } from '../../core/error-handler.service';

@Component({
  selector: 'app-comarca-cadastro',
  templateUrl: './comarca-cadastro.component.html',
  styleUrls: ['./comarca-cadastro.component.css']
})
export class ComarcaCadastroComponent implements OnInit {

  comarca = new Comarca();
  totalRegistros = 0;
  filtro = new ComarcaFiltro();



  constructor(
    private comarcaService: ComarcaService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title) { }

  ngOnInit() {

  const idComarca = this.route.snapshot.params['codigo'];
  this.title.setTitle(`Nova Comarca`);
   if (idComarca > 0) {
      this.carregarComarca(idComarca);
    }
  }


carregarComarca(codigo: number) {
  this.comarcaService.buscarPorCodigo(codigo)
    .then(comarca => {
      this.comarca = comarca;
      this.atualizarTituloEdicao();
    })
    .catch(erro => this.errorHandler.handle(erro));
}


salvar(form: FormControl) {
  if (this.editando) {
    this.atualizarComarca(form);
  } else {
    this.adicionarComarca(form);
  }
}


adicionarComarca(form: FormControl) {
  this.comarcaService.adicionar(this.comarca)
  .then(comarcaAdicionada => {
    this.messageService.add({severity: 'success', detail: 'Comarca salva com sucesso.'});
    this.router.navigate(['/comarcas', comarcaAdicionada.codigo]);
  })
  .catch(erro => this.errorHandler.handle(erro));

}

atualizarComarca(form: FormControl) {
  this.comarcaService.atualizar(this.comarca)
  .then(comarca => {
   this.comarca = comarca;
   this.messageService.add({severity: 'success', detail: 'Comarca atualizada com sucesso.'});
   this.atualizarTituloEdicao();
  })
  .catch(erro => this.errorHandler.handle(erro));

}

get editando() {
  return Boolean(this.comarca.codigo);
}

nova(form: FormControl) {
  form.reset();
  setTimeout(function() {
    this.comarca = new Comarca();
  }.bind(this), 1);
  this.router.navigate(['/comarcas/novo']);
}

atualizarTituloEdicao() {
  this.title.setTitle(`Edição de Comoarca: ${this.comarca.nome}`);
}


}

