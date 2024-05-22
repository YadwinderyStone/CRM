import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDispositionComponent } from './add-disposition.component';

describe('AddDispositionComponent', () => {
  let component: AddDispositionComponent;
  let fixture: ComponentFixture<AddDispositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDispositionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDispositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
