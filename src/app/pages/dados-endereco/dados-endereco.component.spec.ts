import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosEnderecoComponent } from './dados-endereco.component';

describe('DadosEnderecoComponent', () => {
  let component: DadosEnderecoComponent;
  let fixture: ComponentFixture<DadosEnderecoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DadosEnderecoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DadosEnderecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
