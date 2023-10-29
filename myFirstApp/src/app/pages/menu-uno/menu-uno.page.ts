import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BarcodeScanner } from 'capacitor-barcode-scanner';
import { Router } from '@angular/router';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { StorageService } from 'src/app/services/storage.service';
import { AuthService } from 'src/app/services/auth-service.service';
import { LocationService } from 'src/app/services/location.service';
@Component({
  selector: 'app-menu-uno',
  templateUrl: './menu-uno.page.html',
  styleUrls: ['./menu-uno.page.scss'],
})
export class MenuUnoPage implements OnInit {
  qrResult: any = "";
  Titulo = "¡Scanner de registro de clases!"
  parametroIdEmpleado: number | undefined;
  resultadoScan: any = '';
  isScanning: boolean = false;
  usuario: any[] = [];
  user: any;
  separado: string[] = [];
  regiones: any[] = [];
  comunas: any[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private locationService: LocationService,
    private storage: StorageService,
    private authService: AuthService) { }

  async ngOnInit() {

    this.parametroIdEmpleado = this.activatedRoute.snapshot.params['idempleado'];

    const userEmail = this.authService.getLoggedInUser();

    if (userEmail) {
      this.storage.obtenerDatosUsuarioActual().then(usuario => {
        if (usuario) {
          this.user = usuario[0];
          console.log("Bienvenido, " + usuario[0].nombreCompleto);
        }
      });
    }

    const regionesResponse = await this.locationService.getRegion();
    if (regionesResponse.success) {
      this.regiones = regionesResponse.data;
    }

    const comunasResponse = await this.locationService.getComuna(this.user.idRegion);
    if (comunasResponse.success) {
      this.comunas = comunasResponse.data;
    }
  }
  
  getNombreRegion(id: number): string {
    const region = this.regiones.find(r => r.id === id);
    return region;
  }

  getNombreComuna(id: number): string {
    const comuna = this.comunas.find((c) => c.id === id);
    return comuna ? comuna.nombre : 'Desconocida';
  }

  async scan() {
    this.isScanning = true;
  }

  onCodeResult(result: string) {
    this.qrResult = result;
    this.isScanning = false;
    this.separado = this.qrResult.split(',');
  }

  volver() {
    this.router.navigate(['/menu']);
  }
}
