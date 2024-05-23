import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {
  datos: any = {
    email: '',
    contrasena: '',
    contrasena2: '',
    nombre: ''
  };

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    const usuarioString = sessionStorage.getItem('usuario');
    if (usuarioString !== null) {
      this.router.navigate(['/home']); // Redireccionar al home page si hay un usuario en sessionStorage
    }
  }

  async redirectTo(url: string) {
    if (this.datos.contrasena === this.datos.contrasena2) {
      console.log("this.Datos ", this.datos);
      this.authService.registUsu(this.datos.email, this.datos.contrasena, this.datos.nombre).subscribe({
        next: data => {
          console.log("datosRegistro ", data);
          Swal.fire({
            icon: "success",
            title: "Registro exitoso",
            text: "Usuario registrado correctamente",
          });
          // Redirigir al usuario después del registro exitoso
          //this.router.navigate([url]); // Descomentar para usar el enrutador Angular
          window.location.href = url; // Alternativa para redirigir usando JavaScript
        },
        error: (error: HttpErrorResponse) => {
          console.error("Error en el registro: ", error);
          let errorMessage = 'Hubo un problema al registrar. Por favor, intenta de nuevo.';
          if (error.status === 0) {
            errorMessage = 'No se pudo conectar con el servidor. Por favor, verifica tu conexión a internet o que el servidor esté activo.';
          } else if (error.status >= 500) {
            errorMessage = 'Hubo un error en el servidor. Por favor, intenta de nuevo más tarde.';
          } else if (error.status === 400) {
            errorMessage = 'Ya hay una cuenta con ese correo electrónico.';
          }
          Swal.fire({
            icon: "error",
            title: "Error en el registro",
            text: errorMessage,
          });
        }
      });
    } else {
      this.datos.contrasena = "";
      this.datos.contrasena2 = "";
      Swal.fire({
        icon: "error",
        title: "Las contraseñas no coinciden",
        text: "Prueba a ponerla de nuevo",
      });
    }
  }
  noneRegist(enlace: string) {
    window.location.href = enlace;
  }
}
