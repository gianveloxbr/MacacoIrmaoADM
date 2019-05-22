import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPreviewPage } from './modal-preview.page';

describe('ModalPreviewPage', () => {
  let component: ModalPreviewPage;
  let fixture: ComponentFixture<ModalPreviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPreviewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPreviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
