import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { PerfilService } from '../services/perfil.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  usuario: any;
  publicaciones: any[] = []; // Adaptar para que se cargue dinámicamente si es necesario
  numeroPublicaciones:number=0;
  seguidores:number=0; 
  seguidos:number=0;

  constructor(private userService:UserService, private perfilService:PerfilService){}

  ngOnInit(): void {
    const usuarioString = sessionStorage.getItem('usuario');
    if (usuarioString) {
      this.usuario = JSON.parse(usuarioString);
      // Si las publicaciones están almacenadas en el objeto usuario, adaptarlo aquí
      // this.publicaciones = this.usuario.publicaciones;
    } else {
      window.location.href="/iniSesion";
    }
    this.getPublicaciones();
    this.getSeguidoresSeguidos();
  }
  
  getPublicaciones(){
    this.perfilService.getPublicaciones(this.usuario.id).subscribe(data => {
      this.publicaciones = data;
      console.log("publicaciones usuario",data);
      this.numeroPublicaciones =  data.length;
    })

  }

  getSeguidoresSeguidos(){
    this.userService.getSeguidores(this.usuario.id).subscribe(data=>{
      this.seguidores = data.length;
    })
    this.userService.getSeguidos(this.usuario.id).subscribe(data=>{
      this.seguidos = data.length;
    })
  }

  cerrarSesion(){
    sessionStorage.removeItem('usuario');
    window.location.href="/iniSesion";
  }

  goToDetalles(id: number) {
    console.log("detalles", id)
    const id_publi = `${id}`;
    sessionStorage.setItem("publicaionSeleccionada", id_publi)
    window.location.href = `/fotoDetalle`;
  }
  
}

