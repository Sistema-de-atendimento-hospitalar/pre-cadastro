import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SquarePreCadastroComponent } from './square-pre-cadastro.component';

describe('SquarePreCadastroComponent', () => {
  let component: SquarePreCadastroComponent;
  let fixture: ComponentFixture<SquarePreCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SquarePreCadastroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SquarePreCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
