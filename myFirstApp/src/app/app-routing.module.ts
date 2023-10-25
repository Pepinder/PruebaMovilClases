import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { MenuPageModule } from './pages/menu/menu.module';
import { NotFoundComponent } from './not-found/not-found.component';

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
    loadChildren: () => import('./pages/menu/menu.module').then(m => m.MenuPageModule),
    canActivate: [AuthGuard] // Mueve canActivate aquí, dentro del objeto de configuración
  },
  {
    path: ':idempleado/menu-uno',
    loadChildren: () => import('./pages/menu-uno/menu-uno.module').then(m => m.MenuUnoPageModule),
    canActivate: [AuthGuard] // Corregido: canActivate dentro del objeto de configuración
  },
  {
    path: 'menu-dos',
    loadChildren: () => import('./pages/menu-dos/menu-dos.module').then(m => m.MenuDosPageModule),
    canActivate: [AuthGuard] // Corregido: canActivate dentro del objeto de configuración

  },
  {
    path: ':asignaturaId/menu-tres',
    loadChildren: () => import('./pages/menu-tres/menu-tres.module').then(m => m.MenuTresPageModule),
    canActivate: [AuthGuard] // Corregido: canActivate dentro del objeto de configuración

  },
  {
    path: 'menu-cuatro/:calificacion',
    loadChildren: () => import('./pages/menu-cuatro/menu-cuatro.module').then(m => m.MenuCuatroPageModule),
    canActivate: [AuthGuard] // Corregido: canActivate dentro del objeto de configuración

  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then(m => m.RegistroPageModule),
  },
  {
    path: 'camarita',
    loadChildren: () => import('./pages/camara/camara.module').then(m => m.CamaraPageModule),
    canActivate: [AuthGuard] // Corregido: canActivate dentro del objeto de configuración
  },
  {
    path: 'recuperar-contrasena',
    loadChildren: () => import('./pages/recuperar-contrasena/recuperar-contrasena.module').then( m => m.RecuperarContrasenaPageModule)
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: 'not-found',
    pathMatch: 'full'
  },  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
