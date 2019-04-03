import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalStatusPage } from './modal-status.page';

describe('ModalStatusPage', () => {
  let component: ModalStatusPage;
  let fixture: ComponentFixture<ModalStatusPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalStatusPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalStatusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
