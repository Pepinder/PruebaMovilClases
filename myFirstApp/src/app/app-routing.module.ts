import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./pages/menu/menu.module').then(m => m.MenuPageModule)
  },
  {
    path: ':idempleado/menu-uno',
    loadChildren: () => import('./pages/menu-uno/menu-uno.module').then(m => m.MenuUnoPageModule)
  },
  {
    path: 'menu-dos',
    loadChildren: () => import('./pages/menu-dos/menu-dos.module').then(m => m.MenuDosPageModule)
  },
  {
    path: ':asignaturaId/menu-tres',
    loadChildren: () => import('./pages/menu-tres/menu-tres.module').then(m => m.MenuTresPageModule)
  },
  {
    path: 'menu-cuatro/:calificacion',
    loadChildren: () => import('./pages/menu-cuatro/menu-cuatro.module').then(m => m.MenuCuatroPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then(m => m.RegistroPageModule)
  },
  {
    path: 'camarita',
    loadChildren: () => import('./pages/camara/camara.module').then(m => m.CamaraPageModule)
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
