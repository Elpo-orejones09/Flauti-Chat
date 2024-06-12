import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getPublicaciones(id:number):Observable<any>{
    const url = `${this.apiUrl}/publicaciones/usuario/${id}`;
    return this.http.get(url)
  }

  updatePerfil(id:number, nombre:string):Observable<any>{
    const url = `${this.apiUrl}/usuarios/${id}`;
    const content = {
        nombre : nombre,
    }
    return this.http.patch(url, content);
    
  }
}
