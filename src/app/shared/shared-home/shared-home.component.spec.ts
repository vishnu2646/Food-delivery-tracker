import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedHomeComponent } from './shared-home.component';

describe('SharedHomeComponent', () => {
  let component: SharedHomeComponent;
  let fixture: ComponentFixture<SharedHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SharedHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
