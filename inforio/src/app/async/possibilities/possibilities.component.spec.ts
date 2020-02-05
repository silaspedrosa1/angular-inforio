import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PossibilitiesComponent } from './possibilities.component';

describe('PossibilitiesComponent', () => {
  let component: PossibilitiesComponent;
  let fixture: ComponentFixture<PossibilitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PossibilitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PossibilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
