import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-ini-sesion',
  templateUrl: './iniSesion.component.html',
  styleUrls: ['./iniSesion.component.scss'],
})
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
      this.router.navigate(['/home']); // Redireccionar al home page si hay un usuario en sessionStorage
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
            this.router.navigate(['/home']); // Redireccionar al home page después de iniciar sesión
          })
      });
  }

  redirectTo(url: string) {
    window.location.href = url;
  }
}
