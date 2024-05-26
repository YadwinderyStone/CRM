import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractionEmailComponent } from './interaction-email.component';

describe('InteractionEmailComponent', () => {
  let component: InteractionEmailComponent;
  let fixture: ComponentFixture<InteractionEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InteractionEmailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InteractionEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
