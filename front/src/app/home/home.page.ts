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


  constructor(private router: Router, private homeService : HomdService) { }

  ngOnInit():void { }
  obtenerArchivo(e:any){
    const archivo = e.target.files[0];
    console.log(archivo);
    this.datos = archivo;

  }

  subirPublicacion(){

  }

  public redirectTo(url: string) {
    window.location.href = url;
  }
}
