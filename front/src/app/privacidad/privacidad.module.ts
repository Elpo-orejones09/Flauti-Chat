import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivacidadComponent } from './privacidad.component';
import { PrivacidadRoutingModule } from './privacidad-routing.module';

@NgModule({
  declarations: [PrivacidadComponent],
  imports: [
    CommonModule,
    PrivacidadRoutingModule
  ]
})
export class PrivacidadModule { }
