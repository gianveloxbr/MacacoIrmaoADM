import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdminPage } from './admin.page';
import { ModalFotoPage } from '../modal-foto/modal-foto.page';
import { ModalMapaPage } from '../modal-mapa/modal-mapa.page';
import { ModalStatusPage } from '../modal-status/modal-status.page';

const routes: Routes = [
  {
    path: '',
    component: AdminPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AdminPage,ModalFotoPage,ModalMapaPage,ModalStatusPage],
  entryComponents: [ModalFotoPage,ModalMapaPage,ModalStatusPage]
})
export class AdminPageModule {}
