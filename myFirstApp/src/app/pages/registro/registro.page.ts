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
      this.photo = photo ? photo.webviewPath : undefined; // Asigna la foto base64 a la propiedad photo del usuario
    });

  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  async cargarRegion() {
    const req = await this.locationService.getRegion();
    this.regiones = req.data;
    // const regionSeleccionada = this.regionSel;
  }

  

  async cargarComuna() {
    this.seleccionComuna = false;
    const req = await this.locationService.getComuna(this.regionSel);
    this.comunas = req.data;
  }


  registro() {
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

    const regionSeleccionada = this.regiones.find(regiones => regiones.id === this.regionSel);

    if (regionSeleccionada) {
      this.regionSeleccionada = regionSeleccionada.nombre;
    }

    const comunaSeleccionada = this.comunas.find(comuna => comuna.id === this.comunaSel);

    if (comunaSeleccionada) {
      this.comunaSeleccionada = comunaSeleccionada.nombre;
    }

    var usuario = [{
      correo: this.usuario,
      contrasena: this.contrasena,
      nombreCompleto: this.nombreCompleto,
      rut: this.rut,
      fechaNacimiento: this.fechaNacimiento,
      carrera: this.carrera,
      photo: this.photo,
      region: this.regionSeleccionada,
      comuna: this.comunaSeleccionada,
    }];

    console.log(this.regionSeleccionada)

    this.storage.guargarUsuario(usuario);
    this.helper.showAlert("Usuario registrado correctamente.", "Información");
    console.log(usuario)
    this.router.navigateByUrl("login");
  }

  validarRut(rut: string): boolean {
    return this.esRut
  }

  async getCurrentLocation() {
    const options: PositionOptions = {
      enableHighAccuracy: true, 
    };

    try {
      const position: GeolocationPosition = await Geolocation.getCurrentPosition(options);

      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      // const accuracy = position.coords.accuracy;


      console.log('Latitude: ' + latitude);
      console.log('Longitude: ' + longitude);
      // console.log('Accuracy: ' + accuracy);

      return { latitude, longitude };
    } catch (error) {
      console.error('Error al obtener la ubicación: ' + JSON.stringify(error));
      throw error;
      }
    }


}
