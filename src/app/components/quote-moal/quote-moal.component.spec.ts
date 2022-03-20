import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteMoalComponent } from './quote-moal.component';

describe('QuoteMoalComponent', () => {
  let component: QuoteMoalComponent;
  let fixture: ComponentFixture<QuoteMoalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuoteMoalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteMoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
