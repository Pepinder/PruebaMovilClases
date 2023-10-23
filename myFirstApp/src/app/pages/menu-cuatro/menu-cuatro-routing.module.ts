import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuCuatroPage } from './menu-cuatro.page';

const routes: Routes = [
  {
    path: '',
    component: MenuCuatroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuCuatroPageRoutingModule {}
