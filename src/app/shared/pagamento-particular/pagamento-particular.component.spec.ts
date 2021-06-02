import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagamentoParticularComponent } from './pagamento-particular.component';

describe('PagamentoParticularComponent', () => {
  let component: PagamentoParticularComponent;
  let fixture: ComponentFixture<PagamentoParticularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagamentoParticularComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagamentoParticularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
