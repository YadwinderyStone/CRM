import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkCloserHistoryComponent } from './bulk-closer-history.component';

describe('BulkCloserHistoryComponent', () => {
  let component: BulkCloserHistoryComponent;
  let fixture: ComponentFixture<BulkCloserHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkCloserHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BulkCloserHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
