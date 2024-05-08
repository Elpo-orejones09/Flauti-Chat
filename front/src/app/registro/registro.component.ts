import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {
  datos: any = {}; // Inicializa el objeto datos

  constructor(private router: Router) { }

  ngOnInit() { }

  public redirectTo(url: string) {
    
    console.log(this.datos);

    if(this.datos.contrasena == this.datos.contrasena2){
      window.location.href = url;
    }else{
      this.datos.contrasena="";
      this.datos.contrasena2="";
      Swal.fire({
        icon: "error",
        title: "Las contraseñas no coinciden",
        text: "Prueba a ponerla de nuevo",
      });
    }
  }
}
