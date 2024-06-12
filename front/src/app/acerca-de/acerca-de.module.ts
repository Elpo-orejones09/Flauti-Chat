import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcercaDeComponent } from './acerca-de.component';

import { AcercaDeComponentRoutingModule } from './acerca-de-routing.module';

@NgModule({
  declarations: [AcercaDeComponent],
  imports: [
    CommonModule,
    AcercaDeComponentRoutingModule
  ],
})
export class AcercaDeModule { }
