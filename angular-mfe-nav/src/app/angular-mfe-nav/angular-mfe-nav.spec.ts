import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularMfeNav } from './angular-mfe-nav';

describe('AngularMfeNav', () => {
  let component: AngularMfeNav;
  let fixture: ComponentFixture<AngularMfeNav>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularMfeNav]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AngularMfeNav);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
