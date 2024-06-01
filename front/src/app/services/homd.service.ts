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

  postPublicacion(usuario_id:any, contenido:any,):Observable<any>{
    const data = {
      usuario_id:usuario_id,
      contenido:contenido
    };
    return this.http.post(`${this.apiUrl}/publicaciones`, data)
  }
}
