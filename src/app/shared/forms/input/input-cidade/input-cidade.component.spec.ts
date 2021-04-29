import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputCidadeComponent } from './input-cidade.component';

describe('InputCidadeComponent', () => {
  let component: InputCidadeComponent;
  let fixture: ComponentFixture<InputCidadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputCidadeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputCidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
