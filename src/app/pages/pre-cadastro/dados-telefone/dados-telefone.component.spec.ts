import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosTelefoneComponent } from './dados-telefone.component';

describe('DadosTelefoneComponent', () => {
  let component: DadosTelefoneComponent;
  let fixture: ComponentFixture<DadosTelefoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DadosTelefoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DadosTelefoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
