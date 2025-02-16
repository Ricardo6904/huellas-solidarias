import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RescatadoComponent } from './rescatado.component';

describe('RescatadoComponent', () => {
  let component: RescatadoComponent;
  let fixture: ComponentFixture<RescatadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RescatadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RescatadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
