import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolvedInteractionsReportsListComponent } from './resolved-interactions-reports-list.component';

describe('ResolvedInteractionsReportsListComponent', () => {
  let component: ResolvedInteractionsReportsListComponent;
  let fixture: ComponentFixture<ResolvedInteractionsReportsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResolvedInteractionsReportsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResolvedInteractionsReportsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
