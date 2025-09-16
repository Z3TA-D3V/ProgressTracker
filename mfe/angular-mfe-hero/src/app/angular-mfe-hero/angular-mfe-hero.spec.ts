import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularMfeHero } from './angular-mfe-hero';

describe('AngularMfeHero', () => {
  let component: AngularMfeHero;
  let fixture: ComponentFixture<AngularMfeHero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularMfeHero]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AngularMfeHero);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
