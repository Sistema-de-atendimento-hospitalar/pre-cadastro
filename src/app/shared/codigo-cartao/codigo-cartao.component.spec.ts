import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodigoCartaoComponent } from './codigo-cartao.component';

describe('CodigoCartaoComponent', () => {
  let component: CodigoCartaoComponent;
  let fixture: ComponentFixture<CodigoCartaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodigoCartaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodigoCartaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
