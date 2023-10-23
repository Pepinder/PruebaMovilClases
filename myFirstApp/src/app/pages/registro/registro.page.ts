import { Component, OnInit } from '@angular/core';
import { Comuna } from 'src/app/models/comuna';
import { Region } from 'src/app/models/region';
import { HelperService } from 'src/app/services/helper.service';
import { LocationService } from 'src/app/services/location.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  usuario:string = '';
  contrasena:string = '';
  regiones:Region[]=[];
  comunas:Comuna[]=[];
  regionSel:number = 0;
  comunaSel:number = 0;
  seleccionComuna:boolean = true;
  constructor(
              private storage:StorageService,
              private helper:HelperService,
              private locationService:LocationService
              ) { }

  ngOnInit() {
    this.cargarRegion();
  }


  async cargarRegion(){
    const req = await this.locationService.getRegion();
    this.regiones = req.data;
  }

  async cargarComuna(){
    this.seleccionComuna = false;
    const req = await this.locationService.getComuna(this.regionSel);
    this.comunas = req.data;
  }


  registro(){
    if (this.usuario == '') {
      this.helper.showAlert("Debe ingresar un correo","Error");
      return;
    }
    if (this.contrasena == '') {
      this.helper.showAlert("Debe ingresar una contraseña","Error");
      return;
    }

    var usuario = [{
      correo:this.usuario,
      contrasena:this.contrasena
    }];

    this.storage.guargarUsuario(usuario);
    this.helper.showAlert("Usuario registrado correctamente.","Información");
    
  }

}
