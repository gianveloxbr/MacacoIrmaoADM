import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviosPage } from './envios.page';

describe('EnviosPage', () => {
  let component: EnviosPage;
  let fixture: ComponentFixture<EnviosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnviosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnviosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
