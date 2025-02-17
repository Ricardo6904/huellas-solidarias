import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiMascotaComponent } from './mi-mascota.component';

describe('MiMascotaComponent', () => {
  let component: MiMascotaComponent;
  let fixture: ComponentFixture<MiMascotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiMascotaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiMascotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
