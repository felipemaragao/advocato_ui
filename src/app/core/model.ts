export class Permissao {
  codigo: number;
  desricao: string;

}

export class Usuario {
  codigo: number;
  nome: string;
  senha: string;
  email: string;
  permissoes = new Array<Permissao>();

}

export class Escritorio {
  codigo: number;
  nome: string;
}



export class Litigante {
  codigo: number;
  descricaoAutor: string;
  descricaoReu: string;
}


export class Cidade {
  codigo: number;
  nome: string;
  codigoIbge: string;
  estado = new Estado();
}

export class Estado {
  codigo: number;
  nome: string;
  codigoIbge: string;
}

export class Endereco {
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cep: string;
  cidade = new Cidade();

}



export class Contato {
  codigo: number;
  nome: string;
  email: string;
  telefone: string;

  constructor(codigo?: number,
    nome?: string,
    email?: string,
    telefone?: string) {
      this.codigo = codigo;
      this.nome = nome;
      this.email = email;
      this.telefone = telefone;
  }
}

export class Pessoa {
  codigo: number;
  nome: string;
  dataNascimento: Date;
  dataCadastro: Date;
  pessoaIndicacao: string;
  ocupacao: string;
  usuarioCadastro: string;
  endereco = new Endereco();
  contatos = new Array<Contato>();
  ativo: true;


}


export class TipoProcesso {
  codigo: number;
  descricao: string;
}

export class TipoAcao {
  codigo: number;
  descricao: string;
}


export class Comarca {
  codigo: number;
  nome: string;
}

export class Competencia {
  codigo: number;
  nome: string;
}

export class Vara {
  codigo: number;
  nome: string;
  comarca = new Comarca();
  competencia = new Competencia();
}
export class Advogado {
  codigo: number;
  nome: string;
  oab: string;
}

export class TipoAndamento {
  codigo: number;
  descricao: string;
}



export class Processo {
  codigo: number;
  numeroProcesso: string;
  dataAjuizamento: Date;
  dataCadastro: Date;
  resumo: string;
  valorAjuizado: number;
  valorProvisionado: number;
  valorPago: number;
  pessoaCliente = new Pessoa();
  pessoaContraria = new Pessoa();
  pessoaIndicacao = new Pessoa();
  vara = new Vara();
  tipoAcao = new TipoAcao();
  statusEscritorio = new StatusEscritorio();
  andamentos = new Array<Andamento>();
  numeroExterno: string;
  usuarioCadastro = new Usuario();
  tipoProcesso = 'Judicial';

}


export class StatusEscritorio {
  codigo: number;
  nome: string;

}

export class Andamento {
  codigo: number;
  processo = new Processo();
  dataCadastro: Date;
  dataFechado: Date;
  dataAndamento: Date;
  advogadoResponsavel = new Advogado();
  tipoAndamento = new TipoAndamento();
  usuarioCadastro = new Usuario();
  usuarioFechamento = new Usuario();
  descricaoAndamento: string;
  anexo: string;
  urlAnexo: string;


  constructor(codigo?: number,
    processo?: Processo,
    dataCadastro?: Date,
    dataFechado?: Date,
    dataAndamento?: Date,
    advogadoResponsavel?: Advogado,
    tipoAndamento?: TipoAndamento,
    usuarioCadastro?: Usuario,
    usuarioFechamento?: Usuario,
    descricaoAndamento?: string,
    anexo?: string) {

      this.codigo = codigo;
      this.processo = processo;
      this.dataCadastro = dataCadastro;
      this.dataFechado = dataFechado;
      this.dataAndamento = dataAndamento;
      this.advogadoResponsavel = advogadoResponsavel;
      this.tipoAndamento = tipoAndamento;
      this.usuarioCadastro = usuarioCadastro;
      this.usuarioFechamento = usuarioFechamento;
      this.descricaoAndamento = descricaoAndamento;
      this.anexo = anexo;
    }


}


export class FaseProcesso {
  codigo: number;
  nome: string;
}



