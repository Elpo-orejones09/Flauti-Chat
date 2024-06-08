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
  imageSelected: boolean = false;
  datos: any;
  fecha = Date();
  allUsers: any[] = [];
  searchTerm: string = '';

  follows: any;
  likes: any;
  publicaciones: any;
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
  
  menuVisible: boolean = false;

  constructor(private router: Router, private homeService: HomdService, private userService: UserService, private location: Location) { }

  async ngOnInit() {
    this.usuario = sessionStorage.getItem('usuario');
    this.usuario = JSON.parse(this.usuario);
    if (!this.usuario) {
      window.location.href = "/iniSesion";
    }
    this.homeService.getAllUsus(this.usuario.id).subscribe({
      next: (data) => {
        this.allUsers = data;
      },
      error: (error) => {
        console.error('Error fetching users', error);
      }
    });
    this.userService.getSeguidos(this.usuario.id).subscribe(data => {
      this.follows = data;
      this.getUsusSeguidos();
      this.homeService.getLikesUsu(this.usuario.id).subscribe(async data => {
        this.likes = data;
        this.getFollowPublicaciones();
      });
    });
    let publicacionCondicion = sessionStorage.getItem("publicaionSeleccionada");
    if( publicacionCondicion != null || publicacionCondicion != undefined){
      console.log(publicacionCondicion);
      sessionStorage.removeItem("publicaionSeleccionada");
      publicacionCondicion = null;
      window.location.reload();
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
        this.homeService.postPublicacion(this.usuario.id, data).subscribe(data => {
        })
      })
    });

  }

  getUsuPublicacion(id: number) {
    const user: any = this.allUsers.filter(user => user.id === id);
    return user[0].nombre;
  }

  getUsuPerfil(id: number) {
    const user: any = this.allUsers.filter(user => user.id === id);
    return user[0].fotoPerfil;
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

  followPeople(seguido_id: number) {
    this.userService.createSeguidor(this.usuario.id, seguido_id).subscribe(() => {
      const i = this.allUsers.findIndex(user => user.id === seguido_id);
      this.allUsers[i].follow = true;
    })
  }

  unfollowPeople(seguido_id: number) {
    this.userService.deleteSeguidor(this.usuario.id, seguido_id).subscribe(() => {
      const i = this.allUsers.findIndex(user => user.id === seguido_id);
      this.allUsers[i].follow = false;
    })
  }

  async getFollowPublicaciones() {
    let publicaciones: any[] = [];
    const observables = this.follows.map((seguidos: any) =>
      this.homeService.getPublicacionesUsuarios(seguidos.seguido_id)
    );

    forkJoin(observables).subscribe((results: any) => {
      results.forEach((data: any) => {
        for(const datosPublicacion in data){
          this.homeService.getLikesPublicacion(data[datosPublicacion].id).subscribe(dataLikes=>{
            console.log("dataLikes",dataLikes);
            data[datosPublicacion].numLikes = dataLikes.length;
          })
        }
        publicaciones = publicaciones.concat(data);
      });
      console.log(publicaciones)
      this.publicaciones = publicaciones;
      this.getPublicacionesConLike();
      this.publicaciones = this.shuffleArray(this.publicaciones);
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
    const seguidos = this.allUsers.filter(user => this.follows.some((follow: any) => follow.seguido_id === user.id));
    const noSeguidos = this.allUsers.filter(user => !this.follows.some((follow: any) => follow.seguido_id === user.id));

    noSeguidos.forEach(user => user.follow = false);
    seguidos.forEach(user => user.follow = true);

    this.allUsers = [...noSeguidos, ...seguidos];
  }

  getPublicacionesConLike() {
    const likedPosts = this.publicaciones.filter((post: any) => this.likes.some((like: any) => like.publicacion_id === post.id));
    const notLikedPosts = this.publicaciones.filter((post: any) => !this.likes.some((like: any) => like.publicacion_id === post.id));
    notLikedPosts.forEach((post: any) => post.liked = false);
    likedPosts.forEach((post: any) => post.liked = true);
    this.publicaciones = [...likedPosts, ...notLikedPosts];
  }

  goToDetalles(id: number) {
    console.log("detalles", id)
    const id_publi = `${id}`;
    sessionStorage.setItem("publicaionSeleccionada", id_publi)
    window.location.href = `/fotoDetalle`;
  }

  darLike(publicacion_id: number) {
    console.log("suario", this.usuario.id, "a publicación", publicacion_id);
    this.homeService.postLike(publicacion_id, this.usuario.id).subscribe(() => {
      const i = this.publicaciones.findIndex((publicacion: any) => publicacion.id === publicacion_id);
      this.publicaciones[i].liked = true;
      this.publicaciones[i].numLikes++;
    })
  }

  quitarLike(publicacion_id: number) {
    this.homeService.deleteLike(publicacion_id, this.usuario.id).subscribe(() => {
      const i = this.publicaciones.findIndex((publicacion: any) => publicacion.id === publicacion_id);
      this.publicaciones[i].liked = false;
      this.publicaciones[i].numLikes--;
    })
  }
  
  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }

  getLikesPublicacion(publicacion_id:number){
    this.homeService.getLikesPublicacion(publicacion_id).subscribe(data =>{
      
    })

  }

  /*archivoSeleccionado(event: any) {
    // Verificar si se seleccionó un archivo
    if (event.target.files.length > 0) {
      this.imageSelected = true;
      // Cambiar el texto del input label
      const label = document.getElementById('fileInputLabel');
      if (label) {
        label.innerHTML = 'Archivo seleccionado <img src="tick.png" alt="Tick" width="20px">';
      }
    } else {
      this.imageSelected = false;
    }
  }

  eliminarImagen() {
    // Limpiar el input file y restablecer el texto del label
    const input = document.getElementById('fileInput') as HTMLInputElement;
    if (input) {
      input.value = '';
      this.imageSelected = false;
      const label = document.getElementById('fileInputLabel');
      if (label) {
        label.innerHTML = 'Subir archivo';
      }
    }
  }*/
}
