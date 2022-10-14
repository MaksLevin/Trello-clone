import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainBoardsComponent } from './mainboards.component';

describe('MainBoardsComponent', () => {
  let component: MainBoardsComponent;
  let fixture: ComponentFixture<MainBoardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainBoardsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MainBoardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
