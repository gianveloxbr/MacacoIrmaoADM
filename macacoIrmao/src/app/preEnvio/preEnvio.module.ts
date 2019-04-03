import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { PreEnvioPage } from './preEnvio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: 'preEnvio',
        component: PreEnvioPage
      }
    ])
  ],
  declarations: [PreEnvioPage]
})
export class PreEnvioPageModule {}
