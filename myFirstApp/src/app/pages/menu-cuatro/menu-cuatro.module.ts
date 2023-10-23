import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuCuatroPageRoutingModule } from './menu-cuatro-routing.module';

import { MenuCuatroPage } from './menu-cuatro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuCuatroPageRoutingModule
  ],
  declarations: [MenuCuatroPage]
})
export class MenuCuatroPageModule {}
