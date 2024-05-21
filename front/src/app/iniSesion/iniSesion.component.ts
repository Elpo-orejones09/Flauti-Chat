import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-registro',
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
  constructor(private router: Router, private authService:AuthService) { }
  datos:any={};
  app :any ;
  auth :any;
  ngOnInit() { 
    this.app = initializeApp(this.firebaseConfig);
    this.auth = getAuth(this.app);
  }

  iniciarSesion() {
  signInWithEmailAndPassword(this.auth, this.datos.email, this.datos.password).
  then(data =>{
    console.log("email",data.user.email);
    this.authService.iniSesion(data.user.email).
    subscribe(infoUsu=>{
      console.log("usu", infoUsu);
    })
  });
    /*  */
  }
  redirectTo(url:string){
    window.location.href = url;
  }
}
