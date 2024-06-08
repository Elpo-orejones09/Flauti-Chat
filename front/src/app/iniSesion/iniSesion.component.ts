import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-ini-sesion',
  templateUrl: './iniSesion.component.html',
  styleUrls: ['./iniSesion.component.scss'],
})
/*export class AppComponent {
  constructor(private translate: TranslateService) {
    // Configura el idioma por defecto
    this.translate.setDefaultLang('assets/i18n/es.json');
  }
  switchLanguage(language: string) {
    this.translate.use(language);
  }
}*/
export class IniSesionComponent implements OnInit {
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

  constructor(private router: Router, private authService: AuthService) { }

  datos: any = {};
  app: any;
  auth: any;

  ngOnInit() {
    this.app = initializeApp(this.firebaseConfig);
    this.auth = getAuth(this.app);

    const usuarioString = sessionStorage.getItem('usuario');
    if (usuarioString !== null) {
      const usuario = JSON.parse(usuarioString);
      window.location.href = '/home'; // Redireccionar al home page si hay un usuario en sessionStorage
    }
  }

  iniciarSesion() {
    signInWithEmailAndPassword(this.auth, this.datos.email, this.datos.password).
      then(data => {
        console.log("email", data.user.email);
        this.authService.iniSesion(data.user.email).
          subscribe(infoUsu => {
            console.log("usu", infoUsu);
            sessionStorage.setItem('usuario', JSON.stringify(infoUsu)); // Almacena el usuario en sessionStorage
             window.location.href = '/home'; // Redireccionar al home page después de iniciar sesión
          }, (error: any) => {
            console.error("Error en la obtención de la información del usuario: ", error);
            Swal.fire({
              icon: "error",
              title: "Error en la sesión",
              text: "No se pudo obtener la información del usuario. Por favor, intenta de nuevo.",
            });
          });
      })
      .catch((error: any) => {
        console.error("Error en el inicio de sesión: ", error);
        let errorMessage = 'Hubo un problema al iniciar sesión. Por favor, intenta de nuevo.';
        if (error.code === 'auth/user-not-found') {
          errorMessage = 'No se encontró una cuenta con ese correo electrónico.';
        } else if (error.code === 'auth/wrong-password') {
          errorMessage = 'La contraseña es incorrecta. Por favor, intenta de nuevo.';
        } else if (error.code === 'auth/network-request-failed') {
          errorMessage = 'No se pudo conectar con el servidor. Por favor, verifica tu conexión a internet o que el servidor esté activo.';
        }
        Swal.fire({
          icon: "error",
          title: "Error en el inicio de sesión",
          text: errorMessage,
        });
      });
  }

  redirectTo(url: string) {
    window.location.href = url;
  }
}

