import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { IniSesionComponent } from './iniSesion.component';

import { IniSesionComponentRoutingModule} from './iniSesion-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IniSesionComponentRoutingModule
  ],
  declarations: [IniSesionComponent]
})
export class IniSesionComponentPageModule {}