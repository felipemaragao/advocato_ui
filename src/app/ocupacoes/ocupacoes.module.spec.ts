import { OcupacoesModule } from './ocupacoes.module';

describe('OcupacoesModule', () => {
  let ocupacoesModule: OcupacoesModule;

  beforeEach(() => {
    ocupacoesModule = new OcupacoesModule();
  });

  it('should create an instance', () => {
    expect(ocupacoesModule).toBeTruthy();
  });
});
