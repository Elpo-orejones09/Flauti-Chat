import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  usuario: any;
  publicaciones: any[] = []; // Adaptar para que se cargue dinámicamente si es necesario

  ngOnInit(): void {
    const usuarioString = sessionStorage.getItem('usuario');
    if (usuarioString) {
      this.usuario = JSON.parse(usuarioString);
      // Si las publicaciones están almacenadas en el objeto usuario, adaptarlo aquí
      // this.publicaciones = this.usuario.publicaciones;
    } else {
      // Manejo del caso en el que no hay un usuario logueado
      console.error("No se encontró un usuario logueado.");
    }
  }
}

