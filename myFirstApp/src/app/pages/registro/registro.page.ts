import { Component, OnInit, booleanAttribute } from '@angular/core';
import { Comuna } from 'src/app/models/comuna';
import { Region } from 'src/app/models/region';
import { HelperService } from 'src/app/services/helper.service';
import { LocationService } from 'src/app/services/location.service';
import { StorageService } from 'src/app/services/storage.service';
import { PhotoService } from 'src/app/services/photo.service';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { Router } from '@angular/router';
import { UserPhoto } from 'src/app/services/photo.service';
import { Geolocation, GeolocationPosition, PositionOptions } from '@capacitor/geolocation';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})

export class RegistroPage implements OnInit {
  esRut: boolean = true;
  usuario: string = '';
  contrasena: string = '';
  photo: string | undefined;
  nombreCompleto: string = '';
  fechaNacimiento: string = '';
  rut: string = '';
  regionSeleccionada: string = '';
  comunaSeleccionada: string = '';
  carrera: string = '';
  regiones: Region[] = [];
  comunas: Comuna[] = [];
  regionSel: number = 0;
  comunaSel: number = 0;
  seleccionComuna: boolean = true;
  mostrarBoton: boolean = false;
  
  constructor(
    private storage: StorageService,
    private helper: HelperService,
    private locationService: LocationService,
    public photoService: PhotoService,
    private router: Router
  ) { }

  async ngOnInit() {
    this.cargarRegion();
    defineCustomElements(window);
    this.photoService.loadSaved().then((photo) => {
      this.photo = photo ? photo.webviewPath : undefined;
    });

    const datosLocalStorage = localStorage.getItem('usuario');

    // Si hay algo en el localStorage, muestra el botón
    if (datosLocalStorage) {
      this.mostrarBoton = true;
    }

  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  async cargarRegion() {
    const req = await this.locationService.getRegion();
    this.regiones = req.data;
  }



  async cargarComuna() {
    this.seleccionComuna = false;
    const req = await this.locationService.getComuna(this.regionSel);
    this.comunas = req.data;
  }


  async registro() {

    if (this.usuario == '') {
      this.helper.showAlert("Debe ingresar un correo", "Error");
      return;
    }

    if (this.contrasena == '') {
      this.helper.showAlert("Debe ingresar una contraseña", "Error");
      return;
    }

    if (this.nombreCompleto === '') {
      this.helper.showAlert("Debe ingresar su nombre completo", "Error");
      return;
    }

    if (!this.fechaNacimiento) {
      this.helper.showAlert("Debe seleccionar su fecha de nacimiento", "Error");
      return;
    }

    if (!this.validarRut(this.rut)) {
      this.helper.showAlert("El RUT ingresado no es válido", "Error");
      return;
    }

    if (this.carrera === '') {
      this.helper.showAlert("Debe ingresar la carrera que estudia", "Error");
      return;
    }

    

    let regionSeleccionada = this.regiones.find(regiones => regiones.id === this.regionSel);
    var holaa = regionSeleccionada
    console.log(holaa)

    const comunaSeleccionada = this.comunas.find(comuna => comuna.id === this.comunaSel);

    const locationSel = await this.getCurrentLocation();

    var usuario = [{
      correo: this.usuario,
      contrasena: this.contrasena,
      nombreCompleto: this.nombreCompleto,
      rut: this.rut,
      fechaNacimiento: this.fechaNacimiento,
      carrera: this.carrera,
      photo: this.photo,
      region: regionSeleccionada?.nombre,
      comuna: comunaSeleccionada?.nombre,
      latitud: locationSel.latitude,
      longitud: locationSel.longitude,
    }];

  
    this.storage.guargarUsuario(usuario);
    this.helper.showAlert("Usuario registrado correctamente.", "Información");
    console.log(usuario)
    this.router.navigateByUrl("login");
    if (usuario) {
      this.mostrarBoton = true;
    } else {
      // Al menos un campo no está lleno, ocultar el botón
      this.mostrarBoton = false;
    }


  }

  mostrar() {
    this.router.navigate(['/menu'])
    console.log('Botón mostrado');
  }

  validarRut(rut: string): boolean {
    return this.esRut
  }

  async getCurrentLocation() {
    const location = await Geolocation.getCurrentPosition();
    var latitude = location.coords.latitude;
    var longitude = location.coords.longitude;
    var data = { latitude, longitude }
    return data
  }
}