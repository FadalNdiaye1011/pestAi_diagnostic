import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotMapComponent } from './plot-map.component';

describe('PlotMapComponent', () => {
  let component: PlotMapComponent;
  let fixture: ComponentFixture<PlotMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlotMapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlotMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
