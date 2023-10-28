import { Component } from '@angular/core';
// import { Geolocation } from '@capacitor/geolocation';
import { Geolocation, GeolocationPosition, PositionOptions } from '@capacitor/geolocation';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  // constructor(private geolocation: Geolocation) {}
  constructor (){}


  async getCurrentLocation() {
    const options: PositionOptions = {
      enableHighAccuracy: true, 
    };

    try {
      const position: GeolocationPosition = await Geolocation.getCurrentPosition(options);

      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      console.log('Latitude: ' + latitude);
      console.log('Longitude: ' + longitude);

      return { latitude, longitude };
    } catch (error) {
      console.error('Error al obtener la ubicación: ' + JSON.stringify(error));
      throw error;
      }
    }
  }

