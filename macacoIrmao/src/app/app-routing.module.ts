import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'sobre',
    loadChildren: './sobre/sobre.module#SobrePageModule'
  },
  { path: 'admin', loadChildren: './admin/admin.module#AdminPageModule' },
  { path: 'modal-foto', loadChildren: './modal-foto/modal-foto.module#ModalFotoPageModule' },
  { path: 'modal-mapa', loadChildren: './modal-mapa/modal-mapa.module#ModalMapaPageModule' },
  { path: 'modal-status', loadChildren: './modal-status/modal-status.module#ModalStatusPageModule' },
  { path: 'login', loadChildren: './autenticacao/login/login.module#LoginPageModule' },
  { path: 'registro', loadChildren: './autenticacao/registro/registro.module#RegistroPageModule' },
  { path: 'perfil', loadChildren: './autenticacao/perfil/perfil.module#PerfilPageModule' },  { path: 'saiba-mais', loadChildren: './saiba-mais/saiba-mais.module#SaibaMaisPageModule' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
