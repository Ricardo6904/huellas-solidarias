import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoValidacionCorreoComponent } from './dialogo-validacion-correo.component';

describe('DialogoValidacionCorreoComponent', () => {
  let component: DialogoValidacionCorreoComponent;
  let fixture: ComponentFixture<DialogoValidacionCorreoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogoValidacionCorreoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogoValidacionCorreoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
