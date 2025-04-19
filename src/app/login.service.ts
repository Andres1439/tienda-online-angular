import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from './firebase.service';
import { signInWithEmailAndPassword } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  token: string | null = null;

  constructor(
    private router: Router,
    private firebaseService: FirebaseService
  ) {}

  login(email: string, password: string) {
    const auth = this.firebaseService.auth;

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        auth.currentUser?.getIdToken().then((token) => {
          this.token = token;
          this.router.navigate(['/']);
        });
      })
      .catch((error) => {
        console.error('Error al iniciar sesión: ', error);
      });
  }

  getIdToken() {
    return this.token;
  }

  //Verifica si el usuario esta autenticado

  isAutenticado() {
    return this.token != null;
  }

  // Metodo para cerrar sesión

  logout() {
    const auth = this.firebaseService.auth;
    auth
      .signOut()
      .then(() => {
        this.token = null; //resetea el token al cerrar sesión
        this.router.navigate(['login']);
      })
      .catch((error) => console.error('Error logout ', error));
  }
}
