import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}


  getUserName(nombre:string):Observable<any>{
    const url = `${this.apiUrl}/usuarios/${nombre}`;
    return this.http.get(url);
  }

  // Registro de usuario
  registUsu(email: string, password: string, nombre: string, foto: string): Observable<any> {
    const usuario = {
      displayName: nombre,
      email: email,
      password: password,
      photo: foto
    };
    return this.http.post(`${this.apiUrl}/usuarios`, usuario);
  }
  iniSesion(email:any): Observable<any> {
    return this.http.get(`${this.apiUrl}/usuarios/iniSesion/${email}`);
  }
}
