import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DumpRepoertComponent } from './dump-repoert.component';

describe('DumpRepoertComponent', () => {
  let component: DumpRepoertComponent;
  let fixture: ComponentFixture<DumpRepoertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DumpRepoertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DumpRepoertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
