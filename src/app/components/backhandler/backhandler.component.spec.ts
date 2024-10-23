import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackhandlerComponent } from './backhandler.component';

describe('BackhandlerComponent', () => {
  let component: BackhandlerComponent;
  let fixture: ComponentFixture<BackhandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackhandlerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BackhandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
