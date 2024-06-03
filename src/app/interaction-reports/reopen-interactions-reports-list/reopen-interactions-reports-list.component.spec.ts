import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReopenInteractionsReportsListComponent } from './reopen-interactions-reports-list.component';

describe('ReopenInteractionsReportsListComponent', () => {
  let component: ReopenInteractionsReportsListComponent;
  let fixture: ComponentFixture<ReopenInteractionsReportsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReopenInteractionsReportsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReopenInteractionsReportsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
