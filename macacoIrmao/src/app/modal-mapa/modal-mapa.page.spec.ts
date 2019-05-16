import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMapaPage } from './modal-mapa.page';

describe('ModalMapaPage', () => {
  let component: ModalMapaPage;
  let fixture: ComponentFixture<ModalMapaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalMapaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalMapaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
