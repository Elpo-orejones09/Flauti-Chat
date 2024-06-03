import { Component, OnInit } from '@angular/core';
import { getFirestore, collection, query, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.scss'],
})
export class PublicacionesComponent implements OnInit {

  publicacion : any = [];
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

  constructor() { }

  ngOnInit(): void {
    this.app = initializeApp(this.firebaseConfig);
    /* this.loadPublicaciones(); */
  }

 /*  async loadPublicaciones() {
    const db = getFirestore(this.app);
    const q = query(collection(db, "publicaciones"));
    const querySnapshot = await getDocs(q);
    this.publicaciones = querySnapshot.docs.map(doc => doc.data());
  } */
}

