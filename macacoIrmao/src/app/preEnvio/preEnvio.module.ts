import { MbscModule } from '@mobiscroll/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { PreEnvioPage } from './preEnvio.page';
import { ModalPreviewPage} from '../modal-preview/modal-preview.page';

@NgModule({
  imports: [ 
    MbscModule,
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
  declarations: [PreEnvioPage,ModalPreviewPage],
  entryComponents: [ModalPreviewPage]
})
export class PreEnvioPageModule {}
