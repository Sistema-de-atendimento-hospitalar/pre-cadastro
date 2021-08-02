import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputEstadoComponent } from './input-estado.component';

describe('InputEstadoComponent', () => {
  let component: InputEstadoComponent;
  let fixture: ComponentFixture<InputEstadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputEstadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should create name to field form default', () => {
  //   expect(component.converteToControlName('cep', 0)).toEqual("cep");
  // });

  // it('should create name to field form', () => {
  //   expect(component.converteToControlName('cep', 1)).toEqual("cep-1");
  // });

});
