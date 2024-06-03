import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomdService } from '../services/homd.service';
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { UserService } from '../services/user.service';
import { forkJoin } from 'rxjs';
import { Location } from '@angular/common';
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

  follows :any;

  publicaciones:any;

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

  constructor(private router: Router, private homeService: HomdService, private userService: UserService,private location: Location) { }

  async ngOnInit() {
    this.usuario = sessionStorage.getItem('usuario');
    this.usuario = JSON.parse(this.usuario);
    console.log("string usuario",sessionStorage.getItem('usuario'))
    if (!this.usuario) {
      window.location.href = "/iniSesion";
    }
    this.homeService.getAllUsus(this.usuario.id).subscribe({
      next: (data) => {
        this.allUsers = data;
        console.log("users", data);
      },
      error: (error) => {
        console.error('Error fetching users', error);
      } 
    });
    this.userService.getSeguidos(this.usuario.id).subscribe(data => {
      this.follows = data;
      this.getUsusSeguidos();
      this.getFollowPublicaciones();
    })

      
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
      user.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  /* async loadUserProfile(email: string) {
    const db = getFirestore(this.app);
    const userDocRef = doc(db, "users", email);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      this.usuario = userDoc.data();
    } else {
      console.error("No user document found!");
    }
  } */

  followPeople(seguido_id:number){
    console.log("seguidoId",seguido_id);
    this.userService.createSeguidor(this.usuario.id,seguido_id).subscribe(()=>{
      const i = this.allUsers.findIndex(user => user.id === seguido_id);
      this.allUsers[i].follow=true;
    })
  }

  unfollowPeople(seguido_id:number){
    this.userService.deleteSeguidor(this.usuario.id,seguido_id).subscribe(()=>{
      const i = this.allUsers.findIndex(user => user.id === seguido_id);
      this.allUsers[i].follow = false;
    })
  }

  async getFollowPublicaciones(){
    let publicaciones: any[] = [];
  const observables = this.follows.map((seguidos:any) =>
    this.homeService.getPublicacionesUsuarios(seguidos.seguido_id)
  );

  forkJoin(observables).subscribe((results:any) => {
    results.forEach((data:any) => {
      publicaciones = publicaciones.concat(data);
    });
    this.publicaciones = this.shuffleArray(publicaciones);
    console.log("publicaciones",this.publicaciones)
  });
  }

  shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  getUsusSeguidos() {
    const seguidos = this.allUsers.filter(user => this.follows.some((follow:any) => follow.seguido_id === user.id));
    const noSeguidos = this.allUsers.filter(user => !this.follows.some((follow:any) => follow.seguido_id === user.id));

    noSeguidos.forEach(user => user.follow = false);
    seguidos.forEach(user => user.follow = true);

    this.allUsers = [...noSeguidos, ...seguidos];

    console.log("usuariosAll", this.allUsers);
  }

  goToDetalles(id:number){
    console.log("detalles", id)
    window.location.href = `/fotoDetalle`;
  }

}

