import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchNearByComponent } from './search-near-by.component';

describe('SearchNearByComponent', () => {
  let component: SearchNearByComponent;
  let fixture: ComponentFixture<SearchNearByComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchNearByComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchNearByComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
