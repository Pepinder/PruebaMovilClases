import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BarcodeScanner } from 'capacitor-barcode-scanner';
@Component({
  selector: 'app-menu-uno',
  templateUrl: './menu-uno.page.html',
  styleUrls: ['./menu-uno.page.scss'],
})
export class MenuUnoPage implements OnInit {

  parametroIdEmpleado:number | undefined;
  resultadoScan:any='';
  constructor(private activatedRoute:ActivatedRoute) { } 


  ngOnInit() {
    this.parametroIdEmpleado = this.activatedRoute.snapshot.params['idempleado'];
    console.log("Parametro",this.parametroIdEmpleado);
  }

/*   {
    "nombre":"Javier",
    "Edad":21
  } */


  async scan(){
    this.resultadoScan = (await  BarcodeScanner.scan()).code;
    console.log("Resultado scan",JSON.parse(this.resultadoScan));
  }


}
