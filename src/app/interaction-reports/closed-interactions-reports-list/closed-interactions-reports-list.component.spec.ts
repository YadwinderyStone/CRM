import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedInteractionsReportsListComponent } from './closed-interactions-reports-list.component';

describe('ClosedInteractionsReportsListComponent', () => {
  let component: ClosedInteractionsReportsListComponent;
  let fixture: ComponentFixture<ClosedInteractionsReportsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClosedInteractionsReportsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClosedInteractionsReportsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
