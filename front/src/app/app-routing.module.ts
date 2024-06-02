import { NgModule, importProvidersFrom } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
//Aqui cargamos todas las rutas, no es necesario tener un archivo routing para cada componente tenemos un archivo de rutas a nivel global y las inyectamos
const routes: Routes = [
  { //Path to home
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  { //Path to registro
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then(m => m.RegistroComponentPageModule)
  },
  {
    path: 'iniSesion',
    loadChildren: () => import('./iniSesion/iniSesion.module').then(m => m.IniSesionComponentPageModule)
  },
  {
    path: 'userProfile',
    loadChildren: () => import('./user-profile/user-profile.module').then(m => m.UserProfileComponentPageModule)
  },
  {
    path: 'fotoDetalle',
    loadChildren: () => import('./publicaciones/publicaciones.module').then(m => m.PublicacionesModule)
  },
  {
    path: '',
    redirectTo: 'iniSesion',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { } 
