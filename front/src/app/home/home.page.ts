import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomdService } from '../services/homd.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.css'],
})
export class HomePage {
  datos:any;
  usuario:any;
  imageSrc:any;

  constructor(private router: Router, private homeService : HomdService) { }

  ngOnInit():void { 
    this.usuario = sessionStorage.getItem('usuario');
    this.usuario =JSON.parse(this.usuario);
    console.log(this.usuario);
    if(!this.usuario){
      window.location.href="/iniSesion";
    }
  }
  
  obtenerArchivo(e:any){
    const archivo = e.target.files[0];
    console.log(archivo);
    this.datos = archivo;

  }

  subirPublicacion(){
    if (this.datos) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        // Aquí puedes manejar el resultado, por ejemplo, asignándolo a una variable
      this.imageSrc = e.target.result;
      };
      reader.readAsDataURL(this.datos);
    }
    console.log("datos",this.imageSrc);
     this.homeService.postPublicacion(this.usuario.id, this.imageSrc).
     subscribe(data => {
      console.log("subida exitosa", data);
     }) 
  }

  public redirectTo(url: string) {
    window.location.href = url;
  }
}
