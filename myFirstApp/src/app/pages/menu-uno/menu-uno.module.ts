import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuUnoPageRoutingModule } from './menu-uno-routing.module';

import { MenuUnoPage } from './menu-uno.page';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuUnoPageRoutingModule,
    ZXingScannerModule
  ],
  declarations: [MenuUnoPage]
})
export class MenuUnoPageModule { }
