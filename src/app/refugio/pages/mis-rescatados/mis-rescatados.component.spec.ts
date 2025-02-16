import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisRescatadosComponent } from './mis-rescatados.component';

describe('MisRescatadosComponent', () => {
  let component: MisRescatadosComponent;
  let fixture: ComponentFixture<MisRescatadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisRescatadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisRescatadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
