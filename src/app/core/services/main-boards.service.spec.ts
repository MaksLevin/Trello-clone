import { TestBed } from '@angular/core/testing';

import { MainBoardsService } from './main-boards.service';

describe('MainBoardsService', () => {
  let service: MainBoardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainBoardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
