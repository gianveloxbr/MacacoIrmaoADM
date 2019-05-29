import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcorrenciaListComponent } from './ocorrencia-list.component';

describe('OcorrenciaListComponent', () => {
  let component: OcorrenciaListComponent;
  let fixture: ComponentFixture<OcorrenciaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcorrenciaListComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcorrenciaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
