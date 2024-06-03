import { ComponentFixture, TestBed } from '@angular/core/testing';

import { L2L3InteractionsReportsListComponent } from './l2-l3-interactions-reports-list.component';

describe('L2L3InteractionsReportsListComponent', () => {
  let component: L2L3InteractionsReportsListComponent;
  let fixture: ComponentFixture<L2L3InteractionsReportsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ L2L3InteractionsReportsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(L2L3InteractionsReportsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
