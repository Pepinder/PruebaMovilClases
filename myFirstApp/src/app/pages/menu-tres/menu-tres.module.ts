import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuTresPageRoutingModule } from './menu-tres-routing.module';

import { MenuTresPage } from './menu-tres.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuTresPageRoutingModule
  ],
  declarations: [MenuTresPage]
})
export class MenuTresPageModule {}
