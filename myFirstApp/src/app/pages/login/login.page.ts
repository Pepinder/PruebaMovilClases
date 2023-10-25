import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoredCallback } from '@capacitor/core/types/definitions-internal';
import { HelperService } from 'src/app/services/helper.service';
import { StorageService } from 'src/app/services/storage.service';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  correo: string = "";
  contrasena: string = "";

  constructor(
    private router: Router,
    private helper: HelperService,
    private storageService: StorageService,
    private authService: AuthService) { }

  ngOnInit() {
  }

  registro() {
    this.router.navigateByUrl("registro");
  }

  async onLogin() {

    if (this.correo == "") {
      //alert("Debe ingresar un usuario");
      this.helper.showAlert("Debe ingresar un usuario", "Error");
      return;
    }
    if (this.contrasena == "") {
      alert("Debe ingresar una contraseña");
      return;
    }
    // console.log(this.correo);
    // console.log(this.contrasena);

    const credencialesValidas = await this.storageService.validarCredenciales(
      this.correo,
      this.contrasena
    );

    if (credencialesValidas) {
      console.log("Credenciales", this.correo, this.contrasena);
      const usuario = await this.storageService.obtenerUsuario(this.correo);
      console.log('Usuario:', usuario);
      if (credencialesValidas) {
        this.authService.setLoggedInUser(this.correo);
        this.router.navigateByUrl('menu');
      }
    } else {
      this.helper.showAlert("Usuario o contraseña incorrecta.", "Error");
    }
  }



}
