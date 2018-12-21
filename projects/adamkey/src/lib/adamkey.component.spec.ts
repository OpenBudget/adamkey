import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdamkeyComponent } from './adamkey.component';

describe('AdamkeyComponent', () => {
  let component: AdamkeyComponent;
  let fixture: ComponentFixture<AdamkeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdamkeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdamkeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
