import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalBulkCloserComponent } from './internal-bulk-closer.component';

describe('InternalBulkCloserComponent', () => {
  let component: InternalBulkCloserComponent;
  let fixture: ComponentFixture<InternalBulkCloserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternalBulkCloserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternalBulkCloserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
