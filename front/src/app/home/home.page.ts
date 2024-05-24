import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.css'],
})
export class HomePage {
  datos:any;

  app:any;
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
  };

  constructor(private router: Router) { }

  ngOnInit() {
    this.app = initializeApp(this.firebaseConfig);
    this.storage= getStorage(this.app);
    this.storageRef = ref(this.storage, "someChild");
  }
  obtenerArchivo(e:any){
    const archivo = e.target.files[0];
    console.log(archivo);
    this.datos = archivo;

  }

  subirStorage(){
    uploadBytes(this.storageRef, this.datos).then((snapshot) => {
      console.log('Uploaded a blob or file!', snapshot);
    });
  }

  public redirectTo(url: string) {
    window.location.href = url;
  }
}
