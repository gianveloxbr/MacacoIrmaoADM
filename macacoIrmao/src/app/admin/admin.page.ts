import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalFotoPage } from '../modal-foto/modal-foto.page';
import { ModalMapaPage } from '../modal-mapa/modal-mapa.page';
import { ModalStatusPage } from '../modal-status/modal-status.page';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  constructor(public modalController: ModalController) { 

  }

  ngOnInit() {
  }

  async showModalFoto(){
    const modal = await this.modalController.create({
      component: ModalFotoPage
    });

    await modal.present();
  }

  async showModalMapa(){
    const modal = await this.modalController.create({
      component: ModalMapaPage
    });

    await modal.present();
  }

  async showModalStatus(){
    const modal = await this.modalController.create({
      component: ModalStatusPage
    });

    await modal.present();
  }
}
