import { EstadosModule } from './estados.module';

describe('EstadosModule', () => {
  let estadosModule: EstadosModule;

  beforeEach(() => {
    estadosModule = new EstadosModule();
  });

  it('should create an instance', () => {
    expect(estadosModule).toBeTruthy();
  });
});
