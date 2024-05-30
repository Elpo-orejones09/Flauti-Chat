import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {
  datos: any = {
    email: '',
    contrasena: '',
    contrasena2: '',
    nombre: ''
  };

  fecha:string = Date();

  //conf firebase
  app:any;
  fileData:any;
  storage:any;
  storageRef:any;
  firebaseConfig = {
    apiKey: "AIzaSyDafhFR7waF8lsv0nynPsHR77KPQ4gIuTE",
    authDomain: "flauti-chat.firebaseapp.com",
    databaseURL: "https://flauti-chat-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "flauti-chat",
    storageBucket: "flauti-chat.appspot.com",
    messagingSenderId: "71228493507",
    appId: "1:71228493507:web:5c010d94c37d57e62b9c76",
    measurementId: "G-DGE79KQPRV"
  }


  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    const usuarioString = sessionStorage.getItem('usuario');
    if (usuarioString !== null) {
      this.router.navigate(['/home']); // Redireccionar al home page si hay un usuario en sessionStorage
    }
    this.app = initializeApp(this.firebaseConfig);
    this.storage= getStorage(this.app);
  }

  updateTime(){
    this.fecha=Date();
  }

  obtenerArchivo(e:any){
    const archivo = e.target.files[0];
    console.log(archivo);
    this.fileData = archivo;
  }

  async redirectTo(url: string) {
    if (this.datos.contrasena === this.datos.contrasena2) {
      try {
        console.log("this.Datos ", this.datos);
        this.updateTime();
        const newNameFoto: string = `${this.datos.email}/${this.fecha}`;
        this.storageRef = ref(this.storage, newNameFoto);
  
        // Subir archivo a Firebase Storage
        const snapshot = await uploadBytes(this.storageRef, this.fileData);
        console.log('Uploaded a blob or file!', snapshot);
  
        // Obtener la URL de descarga
        const downloadURL = await getDownloadURL(this.storageRef);
        console.log("url", downloadURL);
  
        // Registrar al usuario con la URL de la imagen
        this.authService.registUsu(this.datos.email, this.datos.contrasena, this.datos.user, downloadURL).subscribe({
          next: data => {
            Swal.fire({
              icon: "success",
              title: "Registro exitoso",
              text: "Usuario registrado correctamente",
            });
            // Redirigir al usuario después del registro exitoso
            // this.router.navigate([url]); // Descomentar para usar el enrutador Angular
            window.location.href = url; // Alternativa para redirigir usando JavaScript
          },
          error: (error: HttpErrorResponse) => {
            console.error("Error en el registro: ", error);
            let errorMessage = 'Hubo un problema al registrar. Por favor, intenta de nuevo.';
            if (error.status === 0) {
              errorMessage = 'No se pudo conectar con el servidor. Por favor, verifica tu conexión a internet o que el servidor esté activo.';
            } else if (error.status >= 500) {
              errorMessage = 'Hubo un error en el servidor. Por favor, intenta de nuevo más tarde.';
            } else if (error.status === 400) {
              errorMessage = 'Ya hay una cuenta con ese correo electrónico.';
            }
            Swal.fire({
              icon: "error",
              title: "Error en el registro",
              text: errorMessage,
            });
          }
        });
      } catch (error) {
        console.error('Error uploading file or getting download URL', error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al subir el archivo o al obtener la URL de descarga.",
        });
      }
    } else {
      this.datos.contrasena = "";
      this.datos.contrasena2 = "";
      Swal.fire({
        icon: "error",
        title: "Las contraseñas no coinciden",
        text: "Prueba a ponerla de nuevo",
      });
    }
  }
  
  noneRegist(enlace: string) {
    window.location.href = enlace;
  }
}
