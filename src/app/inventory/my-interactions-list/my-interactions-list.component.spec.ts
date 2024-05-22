import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyInteractionsListComponent } from './my-interactions-list.component';

describe('MyInteractionsListComponent', () => {
  let component: MyInteractionsListComponent;
  let fixture: ComponentFixture<MyInteractionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyInteractionsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyInteractionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
