import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainboardsComponent } from './mainboards.component';

describe('MainboardsComponent', () => {
  let component: MainboardsComponent;
  let fixture: ComponentFixture<MainboardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainboardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainboardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
