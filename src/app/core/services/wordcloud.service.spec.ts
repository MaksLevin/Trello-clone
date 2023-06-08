import { TestBed } from '@angular/core/testing';

import { WordCloudService } from './wordcloud.service';

describe('WordcloudService', () => {
  let service: WordCloudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordCloudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
