import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-mapa',
  templateUrl: './modal-mapa.page.html',
  styleUrls: ['./modal-mapa.page.scss'],
})
export class ModalMapaPage implements OnInit {

  constructor(public modalController: ModalController) { 

  }

  dismiss(){
    this.modalController.dismiss();
  }

  ngOnInit() {
  }

}
