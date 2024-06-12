import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { PerfilService } from '../services/perfil.service';
import { initializeApp } from "firebase/app";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  usuario: any;
  publicaciones: any[] = []; // Adaptar para que se cargue dinámicamente si es necesario
  mostrarFormularioEdicion = false; // Controla la visibilidad del formulario
  numeroPublicaciones: number = 0;
  seguidores: number = 0;
  seguidos: number = 0;

  newName: string = "";
  allUsus: any = [];
  firebaseConfig = {
    apiKey: "AIzaSyDafhFR7waF8lsv0nynPsHR77KPQ4gIuTE",
    authDomain: "flauti-chat.firebaseapp.com",
    databaseURL: "https://flauti-chat-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "flauti-chat",
    storageBucket: "flauti-chat.appspot.com",
    messagingSenderId: "71228493507",
    appId: "1:71228493507:web:5c010d94c37d57e62b9c76",
    measurementId: "G-DGE79KQPRV"
  };

  app: any;
  auth: any;

  constructor(private userService:UserService, private perfilService:PerfilService){}

  ngOnInit(): void {
    this.app = initializeApp(this.firebaseConfig);
    this.auth = getAuth(this.app);

    const usuarioString = sessionStorage.getItem('usuario');
    if (usuarioString) {
      this.usuario = JSON.parse(usuarioString);
      // Si las publicaciones están almacenadas en el objeto usuario, adaptarlo aquí
      // this.publicaciones = this.usuario.publicaciones;
    } else {
      window.location.href = "/iniSesion";
    }
    this.getPublicaciones();
    this.getSeguidoresSeguidos();
  }

  restartPassword(){
    sendPasswordResetEmail(this.auth, this.usuario.email)
    .then(() => {
      console.log('Email enviado');
    })
    .catch((error) => {
      console.error('Error al enviar el correo de restablecimiento de contraseña:', error);
    });
  }
  
  getPublicaciones(){
    this.perfilService.getPublicaciones(this.usuario.id).subscribe(data => {
      this.publicaciones = data;
      console.log("publicaciones usuario", data);
      this.numeroPublicaciones = data.length;
    })
  }

  getSeguidoresSeguidos() {
    this.userService.getSeguidores(this.usuario.id).subscribe(data => {
      this.seguidores = data.length;
    })
    this.userService.getSeguidos(this.usuario.id).subscribe(data => {
      this.seguidos = data.length;
    })
  }

  abrirFormularioEdicion(): void {
    this.mostrarFormularioEdicion = true;
  }

  cerrarFormularioEdicion(): void {
    this.mostrarFormularioEdicion = false;
  }

  guardarCambios(): void {
    // Aquí deberías enviar los cambios al servicio correspondiente
    // Por ejemplo:
    // this.userService.actualizarUsuario(this.usuario).subscribe(() => {
    //   this.cerrarFormularioEdicion();
    // });
    this.cerrarFormularioEdicion();
  }

  cerrarSesion() {
    sessionStorage.removeItem('usuario');
    window.location.href = "/iniSesion";
  }

  goToDetalles(id: number) {
    console.log("detalles", id)
    const id_publi = `${id}`;
    sessionStorage.setItem("publicaionSeleccionada", id_publi)
    window.location.href = `/fotoDetalle`;
  }
  updateName(){
    const id = this.usuario.id;
    const nombre = this.newName;
    this.perfilService.updatePerfil(id,nombre).subscribe(()=>{
      this.newName="";
      this.usuario.nombre= nombre;
      sessionStorage.setItem('usuario', JSON.stringify(this.usuario));
      this.mostrarFormularioEdicion = false;
    })
  }
}
