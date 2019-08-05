import { TiposAndamentoModule } from './tipos-andamento.module';

describe('TiposAndamentoModule', () => {
  let tiposAndamentoModule: TiposAndamentoModule;

  beforeEach(() => {
    tiposAndamentoModule = new TiposAndamentoModule();
  });

  it('should create an instance', () => {
    expect(tiposAndamentoModule).toBeTruthy();
  });
});
