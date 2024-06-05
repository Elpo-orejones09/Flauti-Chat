import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicacionesRoutingModule } from './publicaciones-routing.module';
import { PublicacionesComponent } from './publicaciones.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [PublicacionesComponent],
  imports: [
    FormsModule,
    CommonModule,
    PublicacionesRoutingModule
  ]
})
export class PublicacionesModule { }
