import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IniSesionComponent } from './iniSesion.component'; // Corrección: Importar IniSesionComponent en lugar de RegistroComponent

describe('IniSesionComponent', () => { // Corrección: Cambiar 'RegistroComponent' por 'IniSesionComponent'
  let component: IniSesionComponent; // Corrección: Cambiar 'RegistroComponent' por 'IniSesionComponent'
  let fixture: ComponentFixture<IniSesionComponent>; // Corrección: Cambiar 'RegistroComponent' por 'IniSesionComponent'

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ IniSesionComponent ], // Corrección: Cambiar 'RegistroComponent' por 'IniSesionComponent'
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IniSesionComponent); // Corrección: Cambiar 'RegistroComponent' por 'IniSesionComponent'
    component = fixture.componentInstance; // Corrección: Cambiar 'RegistroComponent' por 'IniSesionComponent'
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
