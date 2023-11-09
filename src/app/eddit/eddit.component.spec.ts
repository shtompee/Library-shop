import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdditComponent } from './eddit.component';

describe('EdditComponent', () => {
  let component: EdditComponent;
  let fixture: ComponentFixture<EdditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EdditComponent]
    });
    fixture = TestBed.createComponent(EdditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
