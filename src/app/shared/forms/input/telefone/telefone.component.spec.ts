import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelefoneComponent } from './telefone.component';

describe('TelefoneComponent', () => {
  let component: TelefoneComponent;
  let fixture: ComponentFixture<TelefoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelefoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TelefoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
