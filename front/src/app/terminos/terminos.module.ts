import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TerminosComponent } from './terminos.component';
import { TerminosRoutingModule } from './terminos-routin.module';

@NgModule({
  declarations: [TerminosComponent],
  imports: [
    CommonModule,
    TerminosRoutingModule
  ]
})
export class TerminosModule { }
