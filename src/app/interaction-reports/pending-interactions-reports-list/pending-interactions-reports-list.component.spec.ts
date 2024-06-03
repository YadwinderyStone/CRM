import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingInteractionsReportsListComponent } from './pending-interactions-reports-list.component';

describe('PendingInteractionsReportsListComponent', () => {
  let component: PendingInteractionsReportsListComponent;
  let fixture: ComponentFixture<PendingInteractionsReportsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingInteractionsReportsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingInteractionsReportsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
