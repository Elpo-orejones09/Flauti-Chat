import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomdService } from '../services/homd.service';
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, getDoc } from 'firebase/firestore';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.css'],
})
export class HomePage implements OnInit {
  datos: any;

  fecha = Date();
  allUsers: any[] = [];
  searchTerm: string = '';

  usuario: any;
  app: any;
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
  };

  isContentVisible: boolean = false;
  keepVisible: boolean = false;

  constructor(private router: Router, private homeService: HomdService) { }

  async ngOnInit() {
    this.homeService.getAllUsus().subscribe({
      next: (data) => {
        this.allUsers = data;
        console.log("users", data);
      },
      error: (error) => {
        console.error('Error fetching users', error);
      }
    });
    this.usuario = sessionStorage.getItem('usuario');
    this.usuario = JSON.parse(this.usuario);
    console.log(this.usuario);
    if (!this.usuario) {
      window.location.href = "/iniSesion";
    }

    this.app = initializeApp(this.firebaseConfig);
    this.storage = getStorage(this.app);
  }

  obtenerArchivo(e: any) {
    const archivo = e.target.files[0];
    console.log(archivo);
    this.datos = archivo;

  }

  updateTime() {
    this.fecha = Date();
  }

  subirPublicacion() {
    this.updateTime();
    const newNameFoto: string = `${this.usuario.email}/${this.fecha}`;
    this.storageRef = ref(this.storage, newNameFoto);
    uploadBytes(this.storageRef, this.datos).then((snapshot) => {
      console.log('Uploaded a blob or file!', snapshot);
      getDownloadURL(this.storageRef).then(data => {
        console.log("url", data)
        this.homeService.postPublicacion(this.usuario.id, data).
          subscribe(data => {
            console.log("subida exitosa", data);
          })
      })
    });
    /*   */
  }

  public redirectTo(url: string) {
    window.location.href = url;
  }

  showContent() {
    this.isContentVisible = true;
  }

  hideContent() {
    setTimeout(() => {
      if (!this.keepVisible) {
        this.isContentVisible = false;
      }
      this.keepVisible = false;
    }, 200);
  }

  keepContentVisible() {
    this.keepVisible = true;
  }

  get filteredUsers() {
    return this.allUsers.filter(user =>
      user.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  async loadUserProfile(email: string) {
    const db = getFirestore(this.app);
    const userDocRef = doc(db, "users", email);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      this.usuario = userDoc.data();
    } else {
      console.error("No user document found!");
    }
  }
}

