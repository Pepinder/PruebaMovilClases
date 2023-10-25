import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { StorageService } from '../../services/storage.service';
import { HelperService } from 'src/app/services/helper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.page.html',
  styleUrls: ['./recuperar-contrasena.page.scss'],
})
export class RecuperarContrasenaPage {
  correo: any;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private storageService: StorageService,
    private helperService: HelperService) { }

  async recuperarContrasena() {
    // Implementa aquí la lógica real de recuperación de contraseña. Esto es un ejemplo simple.

    // Puedes verificar si el correo está registrado en la base de datos.
    // Si el correo es válido, envía un correo de recuperación o un código de verificación.

    const correoExiste = await this.storageService.obtenerUsuario(this.correo);

    if (correoExiste) {
      const contrasena = correoExiste[0].contrasena; // Obtén la contraseña
      this.helperService.showAlert(`Su contraseña es ${contrasena}`, "Recuperación de Contraseña");
      this.router.navigateByUrl('login');
    } else {
      this.helperService.showAlert("No se encontró ninguna cuenta asociada a este correo.", "Recuperación de Contraseña");
      this.router.navigateByUrl('recuperar-contrasena');
    }
  }

}
