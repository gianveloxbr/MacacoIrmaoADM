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
  { path: 'admin', loadChildren: './admin/admin.module#AdminPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
