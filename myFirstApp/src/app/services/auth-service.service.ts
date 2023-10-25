import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: any | null = null; // Aquí almacenaremos los datos del usuario autenticado
  private loggedInUser: string | null = null;
  constructor() { }


  setUser(user: any) {
    this.currentUser = user;
  }

  getUser() {
    return this.currentUser;
  }

  isAuthenticated() {
    return this.currentUser !== null;
  }

  // Establecer el correo del usuario logeado
  setLoggedInUser(correo: string) {
    localStorage.setItem('loggedInUser', correo);
  }

  // Obtener el correo del usuario logeado
  getLoggedInUser(): string | null {
    return localStorage.getItem('loggedInUser');
  }

  // Borrar el correo del usuario logeado
  logout() {
    localStorage.removeItem('loggedInUser');
  }
}
