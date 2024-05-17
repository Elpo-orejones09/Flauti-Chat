import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private http: HttpClient, private router: Router) {}

  // Registro de usuario
  register(email: string, password: string, nombre: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        return userCredential.user.updateProfile({ displayName: nombre }).then(() => {
          // Guardar datos adicionales en tu base de datos si es necesario
          const usuario = {
            uid: userCredential.user.uid,
            email: email,
            nombre: nombre
          };
          return this.http.post('/api/usuarios', usuario).toPromise();
        });
      });
  }

  // Inicio de sesión
  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        return userCredential.user.getIdToken().then(token => {
          return this.http.post('/api/usuarios/iniSesion', { token }).toPromise();
        });
      });
  }

  logout() {
    return this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

  getUser() {
    return this.afAuth.authState;
  }

  getUserData(uid: string) {
    return this.http.get(/api/user?uid=${uid});
  }
}