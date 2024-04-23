import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RegistroComponent } from './registro.component';

import { RegistroComponentRoutingModule} from './registro-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroComponentRoutingModule
  ],
  declarations: [RegistroComponent]
})
export class RegistroComponentPageModule {}