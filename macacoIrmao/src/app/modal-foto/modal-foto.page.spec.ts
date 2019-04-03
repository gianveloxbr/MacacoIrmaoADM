import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFotoPage } from './modal-foto.page';

describe('ModalFotoPage', () => {
  let component: ModalFotoPage;
  let fixture: ComponentFixture<ModalFotoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalFotoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFotoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
