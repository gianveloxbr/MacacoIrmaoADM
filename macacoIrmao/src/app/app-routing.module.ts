import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'envios',
    loadChildren: './envios/envios.module#EnviosPageModule'
  },
  {
    path: 'localizacao',
    loadChildren: './localizacao/localizacao.module#LocalizacaoPageModule'
  },
  {
    path: 'sobre',
    loadChildren: './sobre/sobre.module#SobrePageModule'
  },
  {
    path: '',
    loadChildren: './preEnvio/preEnvio.module#PreEnvioPageModule'
  },
  { path: 'enviado', loadChildren: './enviado/enviado.module#EnviadoPageModule' },
  { path: 'admin', loadChildren: './admin/admin.module#AdminPageModule' },
  { path: 'modal-foto', loadChildren: './modal-foto/modal-foto.module#ModalFotoPageModule' },
  { path: 'modal-mapa', loadChildren: './modal-mapa/modal-mapa.module#ModalMapaPageModule' },
  { path: 'modal-status', loadChildren: './modal-status/modal-status.module#ModalStatusPageModule' },
  { path: 'registro', loadChildren: './autenticacao/registro/registro.module#RegistroPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
