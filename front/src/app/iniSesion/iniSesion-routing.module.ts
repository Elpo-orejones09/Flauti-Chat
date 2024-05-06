import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IniSesionComponent } from './iniSesion.component';

const routes: Routes = [
  {
    path: '',
    component: IniSesionComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IniSesionComponentRoutingModule {}