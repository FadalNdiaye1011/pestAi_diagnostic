import { TestBed } from '@angular/core/testing';

import { PlotMapService } from './plot-map.service';

describe('PlotMapService', () => {
  let service: PlotMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlotMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
