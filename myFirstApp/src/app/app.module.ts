import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ZXingScannerModule } from '@zxing/ngx-scanner';


@NgModule({
  declarations: [AppComponent],
  imports: [
            BrowserModule, 
            IonicModule.forRoot(), 
            AppRoutingModule,
            HttpClientModule,
            ZXingScannerModule
          ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    // Geolocation,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
