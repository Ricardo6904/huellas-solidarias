import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacionesAdopcionComponent } from './notificaciones-adopcion.component';

describe('NotificacionesAdopcionComponent', () => {
  let component: NotificacionesAdopcionComponent;
  let fixture: ComponentFixture<NotificacionesAdopcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificacionesAdopcionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificacionesAdopcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
