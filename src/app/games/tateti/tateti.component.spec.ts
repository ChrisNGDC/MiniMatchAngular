import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TatetiComponent } from './tateti.component';

describe('TatetiComponent', () => {
  let component: TatetiComponent;
  let fixture: ComponentFixture<TatetiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TatetiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TatetiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
