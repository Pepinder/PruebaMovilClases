import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BarcodeScanner } from 'capacitor-barcode-scanner';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
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


  constructor(private activatedRoute: ActivatedRoute) { }


  ngOnInit() {
    this.parametroIdEmpleado = this.activatedRoute.snapshot.params['idempleado'];
    console.log("Parametro", this.parametroIdEmpleado);
  }

  /*   {
      "nombre":"Javier",
      "Edad":21
    } */


  async scan() {
    this.isScanning = true;
  }

  onCodeResult(result: string) {
    this.qrResult = result;
    this.isScanning = false;
  }
}
