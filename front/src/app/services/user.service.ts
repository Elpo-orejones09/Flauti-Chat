import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getSeguidores(user_id:number):Observable<any>{
    const url = `${this.apiUrl}/seguidores/${user_id}`;
    return this.http.get(url);
  }

  getSeguidos(user_id:number):Observable<any>{
    const url = `${this.apiUrl}/seguidos/${user_id}`;
    return this.http.get(url);
  }

  createSeguidor(seguidor_id:number, seguido_id:number):Observable<any>{
    const content = {
      seguidor_id : seguidor_id,
      seguido_id  : seguido_id
    }
    const url = `${this.apiUrl}/seguir`;
    return this.http.post(url, content);
  }
  
  deleteSeguidor(seguidor_id:number, seguido_id: number):Observable<any>{
    const url = `${this.apiUrl}/seguidos/${seguidor_id}/${seguido_id}`;
    return this.http.delete(url);
  }
}
