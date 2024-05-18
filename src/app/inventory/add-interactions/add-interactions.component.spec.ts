import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInteractionsComponent } from './add-interactions.component';

describe('AddInteractionsComponent', () => {
  let component: AddInteractionsComponent;
  let fixture: ComponentFixture<AddInteractionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInteractionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddInteractionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
