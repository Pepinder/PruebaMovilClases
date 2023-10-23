import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuTresPage } from './menu-tres.page';

const routes: Routes = [
  {
    path: '',
    component: MenuTresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuTresPageRoutingModule {}
