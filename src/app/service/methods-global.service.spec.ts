import { TestBed } from '@angular/core/testing';

import { MethodsGlobalService } from './methods-global.service';

describe('MethodsGlobalService', () => {
  let service: MethodsGlobalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MethodsGlobalService);
  });

  it('should be created - MethodsGlobalService', () => {
    expect(service).toBeTruthy();
  });

  it('should create name to field form default', () => {
    expect(service.converteToControlName('cep', 0)).toEqual("cep");
  });

  it('should create name to field form', () => {
    expect(service.converteToControlName('cep', 1)).toEqual("cep-1");
  });
});
