import { TestBed } from '@angular/core/testing';

import { TipoTelefoneService } from './tipo-telefone.service';

describe('TipoTelefoneService', () => {
  let service: TipoTelefoneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoTelefoneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
