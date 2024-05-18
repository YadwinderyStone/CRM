import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryPropertiesComponent } from './inventory-properties.component';

describe('InventoryPropertiesComponent', () => {
  let component: InventoryPropertiesComponent;
  let fixture: ComponentFixture<InventoryPropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryPropertiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
