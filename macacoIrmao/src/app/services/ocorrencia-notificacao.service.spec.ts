import { TestBed } from '@angular/core/testing';

import { OcorrenciaNotificacaoService } from './ocorrencia-notificacao.service';

describe('OcorrenciaNotificacaoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OcorrenciaNotificacaoService = TestBed.get(OcorrenciaNotificacaoService);
    expect(service).toBeTruthy();
  });
});
