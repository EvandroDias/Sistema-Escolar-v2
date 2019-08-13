import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurmaAdminComponent } from './turma-admin.component';

describe('TurmaAdminComponent', () => {
  let component: TurmaAdminComponent;
  let fixture: ComponentFixture<TurmaAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurmaAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurmaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
