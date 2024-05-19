
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  usuario = {
    nombre: 'Juan Pérez',
    username: 'juanperez',
    bio: 'Aficionado a la fotografía y los viajes',
    avatarUrl: 'https://via.placeholder.com/150',
    publicaciones: 34,
    seguidores: 1200,
    seguidos: 300
  };

  publicaciones = [//Esto mas adelante lo quitare es una api para saber el tamaño de las imagenes y del hueco de los componentes
    { id: 1, imageUrl: 'https://via.placeholder.com/300', descripcion: 'Un día en la playa' },
    { id: 2, imageUrl: 'https://via.placeholder.com/300', descripcion: 'Puesta de sol' },
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
