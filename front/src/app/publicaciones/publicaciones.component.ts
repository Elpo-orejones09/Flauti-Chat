import { Component, OnInit } from '@angular/core';
import { getFirestore, collection, query, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { HomdService } from '../services/homd.service';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.scss'],
})
export class PublicacionesComponent implements OnInit {
  nuevoComentario:any = {};
  publicacion : any ;
  //conf firebase
  app: any;
  fileData: any;
  storage: any;
  storageRef: any;
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

  constructor(private publicacionService:HomdService ) { }

  ngOnInit(): void {
    const id = sessionStorage.getItem("publicaionSeleccionada");
    if (id !== null) {
      const id_publi: number = +id; 
      this.publicacionService.getPublicacion(id_publi).subscribe(data=>{
        this.publicacion = data[0];
        console.log(this.publicacion)
      })
  } else {
    window.location.href = "/home"
  }
}

  addComment(){

  }
}

