import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosConfirmacaoComponent } from './dados-confirmacao.component';

describe('DadosConfirmacaoComponent', () => {
  let component: DadosConfirmacaoComponent;
  let fixture: ComponentFixture<DadosConfirmacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DadosConfirmacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DadosConfirmacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
