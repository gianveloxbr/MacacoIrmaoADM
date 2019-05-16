import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-modal-status',
  templateUrl: './modal-status.page.html',
  styleUrls: ['./modal-status.page.scss'],
})
export class ModalStatusPage implements OnInit {

  constructor(public modalController: ModalController, public alertController: AlertController) { }

  ngOnInit() {
  }

  dismiss(){
    this.modalController.dismiss();
  }
  
  async alerta(){
    const alerta = await this.alertController.create({
      header: 'Alteração de Status',
      message: 'Alteração efetuada com sucesso.',
      buttons: ['OK']
    });

    await alerta.present();
  }

}
