import { Component, OnInit } from '@angular/core';
import { getFirestore, collection, query, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { HomdService } from '../services/homd.service';
import { PublicacionService } from '../services/publicacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.scss'],
})
export class PublicacionesComponent implements OnInit {
  nuevoComentario = '';
  usuarioNombres:any=[];
  publicacion : any ;
  usuario:any;
  comentariosPublicacion:any[]=[];
  usuarioPublicacion:any;
  likesPublicacion:any[]=[];
  likeDado:boolean=false;
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

  constructor(private publicacionService:HomdService , private publicacionesService:PublicacionService) { }

  ngOnInit(): void {
    this.usuario = sessionStorage.getItem('usuario');
    this.usuario = JSON.parse(this.usuario);
    console.log("string usuario", sessionStorage.getItem('usuario'))
    if (!this.usuario) {
      window.location.href = "/iniSesion";
    }
    const id = sessionStorage.getItem("publicaionSeleccionada");
    if (id !== null) {
      const id_publi: number = +id; 
      this.publicacionService.getPublicacion(id_publi).subscribe(data=>{
        this.publicacion = data[0];
        console.log(this.publicacion)
        this.getComentarios();
        this.publicacionService.getUserById(this.publicacion.usuario_id).subscribe(userData=>{
          this.usuarioPublicacion=userData;
        });
        this.publicacionService.getLikesPublicacion(id_publi).subscribe(likeData => {
          this.likesPublicacion = likeData;
          const like = likeData.filter((item:any) => item.usuario_id === this.usuario.id);
          if(like.length > 0){
            this.likeDado =  true;
          }else{
            this.likeDado = false;
          }
          
        })
      })
  } else {
    window.location.href = "/home"
  }
}

cargarNombresDeUsuarios(data:any) {
  const usuarioIds = data.map((comentario:any) => comentario.usuario_id);
  usuarioIds.forEach((id:number) => {
    if (this.usuarioNombres[id]==undefined) {
      this.publicacionService.getUserById(id).subscribe(data => {
        this.usuarioNombres[id] = data.nombre;
        console.log(data);
      });
      
    }
  });
}


  getComentarios(){
    this.publicacionesService.getComentsPublicacion(this.publicacion.id).subscribe(data=>{
      this.comentariosPublicacion = data;
      console.log("precomentarios",data)
      this.cargarNombresDeUsuarios(data);
      console.log("comentarios",this.comentariosPublicacion)
    })
  }

  addComment(){
    if(this.nuevoComentario.length>0){
      this.publicacionesService.postComent(this.usuario.id, this.publicacion.id, this.nuevoComentario).subscribe(()=>{
        this.nuevoComentario = "";
        this.getComentarios();
      });  
    }  
  }

  darLike(){
    this.publicacionService.postLike(this.publicacion.id, this.usuario.id).subscribe(()=>{
      this.likeDado = true;
      this.likesPublicacion.length++;
    })
  }

  quitarLike(){
    this.publicacionService.deleteLike(this.publicacion.id, this.usuario.id).subscribe(()=>{
      this.likeDado = false;
      this.likesPublicacion.length--;
    })
  }

  eliminarPublicacion(){
    
    Swal.fire({
      title: "¿Deseas eliminar el post?",
      text: "No podras desacer los cambios",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, quiero eliminarlo",
      cancelButtonText: "Cancelar"
    }).then((result:any) => {
      if (result.isConfirmed) {
        this.publicacionesService.eliminarComentarios(this.publicacion.id).subscribe(()=>{
          this.publicacionesService.eliminarLikesPublicacion(this.publicacion.id).subscribe(()=>{
            this.publicacionesService.eliminarPublicacion(this.publicacion.id).subscribe(()=>{});
            window.location.href = "/userProfile";
          });
        }); 
      }
      });
    }

}

