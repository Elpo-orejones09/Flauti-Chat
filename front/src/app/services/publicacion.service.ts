import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {
  apiUrl = 'http://localhost:3000/api';

  constructor(private http : HttpClient) { }

  getComentsPublicacion(publicacion_id:number):Observable<any>{
    const url = `${this.apiUrl}/comentarios/publicacion/${publicacion_id}`;
    return this.http.get(url);
  }

  postComent(usuario_id:number, publicacion_id:number, contenido:string, ):Observable<any>{
    const comentario = {
      usuario_id:usuario_id,
      publicacion_id:publicacion_id,
      contenido:contenido
    }
    const url = `${this.apiUrl}/comentarios`;
    return this.http.post(url, comentario);
  }
}
