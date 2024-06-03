import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomdService {
  apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getAllUsus(id:number):Observable<any>{
    return this.http.get(`${this.apiUrl}/usuarios/no/${id}`);
  }

  getPublicaciones(){
    //coger publicaciones por id de usuario
  }

  postPublicacion(usuario_id:any, contenido:any,):Observable<any>{
    const data = {
      usuario_id:usuario_id,
      contenido:contenido
    };
    return this.http.post(`${this.apiUrl}/publicaciones`, data)
  }
  getPublicacionesUsuarios(user_id:number):Observable<any>{
    const url = `${this.apiUrl}/publicaciones/usuario/${user_id}`;
    return this.http.get(url);
  }

  getLikesUsu(usuario_id:number):Observable<any>{
    const url = `${this.apiUrl}/likes/usuario/${usuario_id}`;
    return this.http.get(url);
  }

  postLike(publicacion_id:number, usuario_id:number):Observable<any>{
    const url= `${this.apiUrl}/likes`;
    const content = {
      publicacion_id : publicacion_id,
      usuario_id : usuario_id
    }

    return this.http.post(url , content);
  }

}
