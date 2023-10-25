import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { AuthService } from './auth-service.service';
const storageUsuario = 'usuarioData';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storageUsuario = 'usuarioData';

  constructor(private authService: AuthService) { }

  async setItem(llave: string, valor: string) {
    await Preferences.set({ key: llave, value: valor });
  }

  async getItem(llave: string): Promise<string | null> {
    const obj = await Preferences.get({ key: llave });
    return obj.value;
  }

  async guargarUsuario(user: any) {
    const existingUsersData = await this.getItem(this.storageUsuario);
    let userStorage = existingUsersData ? JSON.parse(existingUsersData) : [];
    userStorage.push(user);

    await this.setItem(this.storageUsuario, JSON.stringify(userStorage));
  }

  async validarCredenciales(correo: string, contrasena: string): Promise<boolean> {
    const usuarioObtenido = await this.obtenerUsuario(correo);
    if (usuarioObtenido) {
      console.log('Usuario obtenido:', usuarioObtenido);
      return usuarioObtenido[0].contrasena === contrasena;
    }
    return false;
  }

  async obtenerUsuario(correo: string) {
    const storageData = await this.getItem(this.storageUsuario);

    if (storageData === null) {
      return null; // No hay usuarios almacenados
    }
    const data: any[] = JSON.parse(storageData);
    if (data) {
      // Buscar el usuario por correo electrónico
      // console.log("Probando ", data[0][0].correo); // Esto imprimirá "pepoed"
      // console.log('Buscando usuario con correo:', correo);
      // const usuarioEncontrado = data.flat(2).find((user) => user.correo === correo);
      const usuarioEncontrado = data.find((user) => user[0].correo === correo);

      console.log('Usuario encontrado:', usuarioEncontrado);
      return usuarioEncontrado || null;
    } else {
      console.log('No se encontraron usuarios en los datos.');
      return null;
    }
  }




  async obtenerDatosUsuarioActual(): Promise<any | null> {
    const correoUsuarioActual = this.authService.getLoggedInUser(); // Obtén el correo del usuario actual
    if (correoUsuarioActual) {
      const usuario = await this.obtenerUsuario(correoUsuarioActual);
      return usuario;
    } else {
      return null; // No hay un usuario logeado
    }
  }
}
