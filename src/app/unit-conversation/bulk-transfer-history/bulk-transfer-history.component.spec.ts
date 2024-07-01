import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkTransferHistoryComponent } from './bulk-transfer-history.component';

describe('BulkTransferHistoryComponent', () => {
  let component: BulkTransferHistoryComponent;
  let fixture: ComponentFixture<BulkTransferHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkTransferHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BulkTransferHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
